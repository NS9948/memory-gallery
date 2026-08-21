import s3 from "../config/s3.js";
import crypto from "crypto";
import path from "path";
import {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const uploadToS3 = async (file,userId) => {
    const uniqueId = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    const key = `users/${userId}/media/${uniqueId}${extension}`;
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3.send(command);
    return key;
};

const getSignedMediaUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key
    });
    const url = await getSignedUrl(s3, command, {
        expiresIn: 3600
    });

    return url;
};

const deleteFromS3 = async (key) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key
    })
    await s3.send(command)
};

export {
    uploadToS3,
    getSignedMediaUrl,
    deleteFromS3
};