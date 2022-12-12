import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Firehose from 'src/lib/aws/firehose';
import { Option, Question } from 'src/models';

@Injectable()
export class PollService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private readonly questionRepo: typeof Question,
    @Inject('OPTION_REPOSITORY')
    private readonly optionRepo: typeof Option,
  ) {}

  public async getQuestions(): Promise<any> {
    try {
      const data = await this.questionRepo.findAll({
        include: [
          {
            model: this.optionRepo,
            required: true,
          },
        ],
      });
      return data;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async storeVote() {
    try {
      const recordParams = {
        Record: {
          Data: JSON.stringify({ id: 1, vote_id: 2 }),
        },
        DeliveryStreamName: process.env.AWS_FIREHOSE_STREAM,
      };
      const data = await Firehose.putRecord(recordParams);
      console.log('data', data);

      return data;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
