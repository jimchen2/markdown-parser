// pages/api/get-upload-url.ts
import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { withAuth } from "../../lib/auth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const s3Client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const fileName = `${uuidv4()}-${Date.now()}.jpg`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    const imageUrl = `${process.env.AWS_PUBLIC_URL}/${fileName}`;

    res.status(200).json({ uploadUrl, imageUrl });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    res.status(500).json({ error: "Error generating upload URL" });
  }
});
