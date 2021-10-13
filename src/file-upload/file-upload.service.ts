import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileUploadService {
    private aws;
  
    constructor() {
      this.aws = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_REGION,
        params: {
          Bucket: process.env.S3_BUCKET,
          ACL: 'public-read',
        },
      });

    }
  
    async uploadFileToS3(fileStreamOrBuffer, fileName, userId) {
      const extension = /(?:\.([^.]+))?$/.exec(fileName)[0];
      const { Location } = await this.aws
        .upload({
          Key: `users/${userId}/photo-${new Date().getTime()}${extension}`,
          Body: fileStreamOrBuffer,
          Bucket: process.env.S3_BUCKET,
          ACL: 'public-read',
        })
        .promise();
  
      return Location;
    }
}
