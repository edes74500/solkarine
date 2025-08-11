import s3 from "@/config/s3Client.config";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

export const setImageToFolderInR2 = async ({
  imageUrl,
  folder,
  imageName,
}: {
  imageUrl: string;
  folder: string;
  imageName: string;
}): Promise<string> => {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not defined");
  }

  const imgExtension = imageUrl.split(".").pop();
  const newImgName = uuidv4().slice(0, 10) + "_" + imageName;

  const imagePath = `uploads/${folder}/${newImgName}.${imgExtension}`;
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

export const deleteImageFromR2 = async (imageUrl: string): Promise<boolean> => {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not defined");
  }

  const key = imageUrl.split(process.env.R2_BUCKET_URL + "/").pop();
  console.log("key", key);
  if (!key) {
    return false;
  }

  await s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));

  return true;
};
