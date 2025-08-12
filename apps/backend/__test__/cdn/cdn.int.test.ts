import s3 from "@/config/s3Client.config";
import { deleteImageFromR2, setImageToFolderInR2 } from "@/services/cdn.service";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

describe("CDN Service", () => {
  const bucketName = process.env.R2_BUCKET_NAME;
  const bucketUrl = process.env.R2_BUCKET_URL;
  let testImageUrl: string;

  beforeAll(async () => {
    // Préparer une image de test dans le bucket
    const testKey = `test-${uuidv4()}.png`;
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: testKey,
        Body: Buffer.from("fake-image-content"),
        ContentType: "image/png",
      }),
    );
    testImageUrl = `${bucketUrl}/${testKey}`;
  });

  afterAll(async () => {
    // Nettoyer les images de test
    try {
      const testKey = testImageUrl.split(`${bucketUrl}/`).pop();
      if (testKey) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: testKey,
          }),
        );
      }
    } catch (error) {
      console.error("Erreur lors du nettoyage:", error);
    }
  });

  describe("setImageToFolderInR2", () => {
    it("devrait copier une image dans un dossier spécifique", async () => {
      // Arrange
      const folder = "test-folder";
      const imageName = "test-image";

      // Act
      const result = await setImageToFolderInR2({
        imageUrl: testImageUrl,
        folder,
        imageName,
      });

      // Assert
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect((result as string).includes(`uploads/${folder}`)).toBeTruthy();
      expect((result as string).includes(imageName)).toBeTruthy();

      // Cleanup
      await deleteImageFromR2(result as string);
    });

    it("devrait copier plusieurs images dans un dossier spécifique", async () => {
      // Arrange
      const folder = "test-folder";
      const imageName = "test-multiple";
      const imageUrls = [testImageUrl, testImageUrl]; // Utiliser la même image deux fois

      // Act
      const results = await setImageToFolderInR2({
        imageUrl: imageUrls,
        folder,
        imageName,
      });

      // Assert
      expect(Array.isArray(results)).toBeTruthy();
      expect((results as string[]).length).toBe(2);
      (results as string[]).forEach((url) => {
        expect(url.includes(`uploads/${folder}`)).toBeTruthy();
        expect(url.includes(imageName)).toBeTruthy();
      });

      // Cleanup
      await deleteImageFromR2(results as string[]);
    });

    it("devrait retourner un tableau vide si aucune image n'est fournie", async () => {
      // Act
      const result = await setImageToFolderInR2({
        imageUrl: undefined,
        folder: "test-folder",
        imageName: "test-empty",
      });

      // Assert
      expect(Array.isArray(result)).toBeTruthy();
      expect((result as string[]).length).toBe(0);
    });

    it("devrait gérer correctement un tableau vide d'images", async () => {
      // Act
      const result = await setImageToFolderInR2({
        imageUrl: [],
        folder: "test-folder",
        imageName: "test-empty-array",
      });

      // Assert
      expect(Array.isArray(result)).toBeTruthy();
      expect((result as string[]).length).toBe(0);
    });

    it("devrait ignorer les URLs nulles dans un tableau", async () => {
      // Arrange
      const folder = "test-folder";
      const imageName = "test-null-urls";
      const imageUrls = [testImageUrl, null, undefined, testImageUrl] as any[];

      // Act
      const results = await setImageToFolderInR2({
        imageUrl: imageUrls,
        folder,
        imageName,
      });

      // Assert
      expect(Array.isArray(results)).toBeTruthy();
      expect((results as string[]).length).toBe(2);

      // Cleanup
      await deleteImageFromR2(results as string[]);
    });

    it("devrait lever une erreur si R2_BUCKET_NAME n'est pas défini", async () => {
      // Arrange
      const originalBucketName = process.env.R2_BUCKET_NAME;
      process.env.R2_BUCKET_NAME = "";

      // Act & Assert
      await expect(
        setImageToFolderInR2({
          imageUrl: testImageUrl,
          folder: "test-folder",
          imageName: "test-error",
        }),
      ).rejects.toThrow("R2_BUCKET_NAME is not defined");

      // Restore
      process.env.R2_BUCKET_NAME = originalBucketName;
    });

    it("devrait lever une erreur si R2_BUCKET_URL n'est pas défini", async () => {
      // Arrange
      const originalBucketUrl = process.env.R2_BUCKET_URL;
      process.env.R2_BUCKET_URL = "";

      // Act & Assert
      await expect(
        setImageToFolderInR2({
          imageUrl: testImageUrl,
          folder: "test-folder",
          imageName: "test-error",
        }),
      ).rejects.toThrow("R2_BUCKET_URL is not defined");

      // Restore
      process.env.R2_BUCKET_URL = originalBucketUrl;
    });
  });

  describe("deleteImageFromR2", () => {
    it("devrait supprimer une image du bucket", async () => {
      // Arrange
      const testKey = `test-delete-${uuidv4()}.png`;
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: testKey,
          Body: Buffer.from("delete-test-content"),
          ContentType: "image/png",
        }),
      );
      const imageUrl = `${bucketUrl}/${testKey}`;

      // Act
      const result = await deleteImageFromR2(imageUrl);

      // Assert
      expect(result).toBeTruthy();

      // Vérifier que l'image a bien été supprimée
      try {
        await s3.send(
          new GetObjectCommand({
            Bucket: bucketName,
            Key: testKey,
          }),
        );
        fail("L'image n'a pas été supprimée");
      } catch (error: any) {
        expect(error.name).toBe("NoSuchKey");
      }
    });

    it("devrait supprimer plusieurs images du bucket", async () => {
      // Arrange
      const testKeys = [`test-delete-multi-1-${uuidv4()}.png`, `test-delete-multi-2-${uuidv4()}.png`];
      const imageUrls: string[] = [];

      for (const key of testKeys) {
        await s3.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: Buffer.from("delete-multi-test-content"),
            ContentType: "image/png",
          }),
        );
        imageUrls.push(`${bucketUrl}/${key}`);
      }

      // Act
      const result = await deleteImageFromR2(imageUrls);

      // Assert
      expect(result).toBeTruthy();

      // Vérifier que les images ont bien été supprimées
      for (const key of testKeys) {
        try {
          await s3.send(
            new GetObjectCommand({
              Bucket: bucketName,
              Key: key,
            }),
          );
          fail(`L'image ${key} n'a pas été supprimée`);
        } catch (error: any) {
          expect(error.name).toBe("NoSuchKey");
        }
      }
    });

    it("devrait gérer correctement les URLs invalides", async () => {
      // Act
      const result = await deleteImageFromR2("invalid-url");

      // Assert
      expect(result).toBeFalsy();
    });

    it("devrait retourner false si une des URLs dans un tableau est invalide", async () => {
      // Arrange
      const testKey = `test-delete-partial-${uuidv4()}.png`;
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: testKey,
          Body: Buffer.from("delete-partial-test-content"),
          ContentType: "image/png",
        }),
      );
      const validUrl = `${bucketUrl}/${testKey}`;
      const imageUrls = [validUrl, "invalid-url"];

      // Act
      const result = await deleteImageFromR2(imageUrls);

      // Assert
      expect(result).toBeFalsy();

      // Cleanup - l'image valide pourrait encore exister
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: testKey,
        }),
      );
    });

    it("devrait gérer correctement les valeurs null ou undefined", async () => {
      // Act
      const result1 = await deleteImageFromR2(null as any);
      const result2 = await deleteImageFromR2(undefined as any);
      const result3 = await deleteImageFromR2([null, undefined] as any);

      // Assert
      expect(result1).toBeFalsy();
      expect(result2).toBeFalsy();
      expect(result3).toBeFalsy();
    });

    it("devrait lever une erreur si R2_BUCKET_NAME n'est pas défini", async () => {
      // Arrange
      const originalBucketName = process.env.R2_BUCKET_NAME;
      process.env.R2_BUCKET_NAME = "";

      // Act & Assert
      await expect(deleteImageFromR2(testImageUrl)).rejects.toThrow("R2_BUCKET_NAME is not defined");

      // Restore
      process.env.R2_BUCKET_NAME = originalBucketName;
    });

    // it("devrait lever une erreur si R2_ENDPOINT n'est pas défini", async () => {
    //   // Arrange
    //   const originalEndpoint = process.env.R2_ENDPOINT;
    //   process.env.R2_ENDPOINT = "";

    //   // Act & Assert
    //   await expect(deleteImageFromR2(testImageUrl)).rejects.toThrow("R2_ENDPOINT is not defined");

    //   // Restore
    //   process.env.R2_ENDPOINT = originalEndpoint;
    // });
  });

  it("devrait vérifier si les variables d'environnement sont définies", () => {
    expect(process.env.R2_BUCKET_NAME).toBeDefined();
    expect(process.env.R2_ACCESS_KEY_ID).toBeDefined();
    expect(process.env.R2_ACCESS_KEY_SECRET).toBeDefined();
    expect(process.env.R2_ENDPOINT).toBeDefined();
    expect(process.env.R2_BUCKET_URL).toBeDefined();
    expect(process.env.R2_ENDPOINT).toEqual("http://localhost:9000");
  });
});
