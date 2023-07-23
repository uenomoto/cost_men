import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

// S3に画像をアップロードし、そのURLを取得する関数
const uploadImageToS3 = async (file: File) => {
  // アップロード時のファイル名を作成
  const fileName = `${Date.now()}-${file.name}`;
  // S3へのアップロードに必要な情報をまとめるオブジェクト
  const params: PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : "",
    Key: fileName,
    ContentType: file.type,
    Body: file,
  };

  try {
    // S3に画像をアップロードする
    const data = await s3.upload(params).promise();
    console.log("画像アップロード成功:", data.Location);
    return data.Location;
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    return null;
  }
};
