import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import Firehose from 'src/lib/aws/firehose';
import { Option, Question, Vote } from 'src/models';
import { VoteRequestDto } from './dto';

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

  public async storeVote(dto: VoteRequestDto) {
    console.log('store vote dto', dto);

    try {
      const recordParams = {
        Record: {
          Data: JSON.stringify({
            questionId: dto.questionId,
            optionId: dto.optionId,
          }),
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
      const options = await this.optionRepo.findAll();
      const resultSchema = options.map((option) => {
        return {
          id: option.id,
          title: option.title,
          voteCount: 0,
          percentage: 0,
        };
      });

      const totalVote = await this.voteRepo.count();
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
          const index = resultSchema.findIndex(
            (option) => option.id === item.optionId,
          );

          if (index >= 0) {
            resultSchema[index].voteCount = item.voteCount;
            console.log(
              'resultSchema[index].voteCount',
              resultSchema[index].voteCount,
            );

            const per =
              (Number(resultSchema[index].voteCount) / Number(totalVote)) * 100;
            resultSchema[index].percentage = Number(per.toFixed(2));
          }
        }),
      ).then(() => {
        return resultSchema;
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
