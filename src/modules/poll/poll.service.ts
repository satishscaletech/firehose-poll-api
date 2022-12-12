import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import Firehose from 'src/lib/aws/firehose';
import { Option, Question, Vote } from 'src/models';

@Injectable()
export class PollService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private readonly questionRepo: typeof Question,
    @Inject('OPTION_REPOSITORY')
    private readonly optionRepo: typeof Option,
    @Inject('VOTE_REPOSITORY')
    private readonly voteRepo: typeof Vote,
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
          Data: JSON.stringify({ questionId: 1, optionId: 2 }),
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

  public async getResult() {
    try {
      const voteData = await this.voteRepo.findAll({
        attributes: [
          'optionId',
          [Sequelize.fn('COUNT', 'option_id'), 'voteCount'],
        ],
        group: ['option_id'],
        raw: true,
      });

      console.log('Vote statistics', voteData);

      return Promise.all(
        voteData.map(async (item: any) => {
          console.log('item VoteCount', item);

          const option = await this.optionRepo.findByPk(item.optionId);
          item.title = option?.title;
          return item;
        }),
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
