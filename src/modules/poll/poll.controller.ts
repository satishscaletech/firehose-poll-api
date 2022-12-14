import { Body, Controller, Get, Post } from '@nestjs/common';
import { VoteRequestDto } from './dto';
import { PollService } from './poll.service';

@Controller('api/v1/poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get('/questions')
  async getQuestions() {
    const data = await this.pollService.getQuestions();
    return { data };
  }

  @Post('/vote')
  async storeVote(@Body() body: VoteRequestDto) {
    const data = await this.pollService.storeVote(body);
    return { data };
  }

  @Get('/result')
  async getResult(): Promise<any> {
    const data = await this.pollService.getResult();
    return { data };
  }
}
