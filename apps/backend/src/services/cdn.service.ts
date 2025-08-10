import s3 from "@/config/s3Client.config";
import { CopyObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

export const setImageToFolderInR2 = async (imageUrl: string, folder: string, imageName: string): Promise<string> => {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not defined");
  }

  //   const imageId = imageUrl.split("/").pop();
  //   if (!imageId) {
  //     throw new Error("Image name is not defined");
  //   }
  const imagePath = `${folder}/${imageName}`;
  const tmpKeyUrl = imageUrl.split(process.env.R2_BUCKET_URL + "/").pop();
  if (!tmpKeyUrl) {
    throw new Error("Tmp key url is not defined");
  }

  await s3.send(
    new CopyObjectCommand({
      Bucket: bucketName,
      CopySource: encodeURI(`${bucketName}/${tmpKeyUrl}`), // important : encoder
      Key: imagePath,
      MetadataDirective: "COPY",
    }),
  );
  const newImageUrl = `${process.env.R2_BUCKET_URL}/${imagePath}`;

  return newImageUrl;
};
