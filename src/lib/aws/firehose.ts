import { InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

class FirehoseService {
  private firehose: any;

  constructor() {
    this.firehose = new AWS.Firehose({
      apiVersion: '2015-08-04',
      region: 'ap-south-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async putRecord(data: any): Promise<any> {
    try {
      return await this.firehose.putRecord(data, function (err, data) {
        console.log('error', err);
        console.log('data', data);
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}

const Firehose = new FirehoseService();
export default Firehose;
