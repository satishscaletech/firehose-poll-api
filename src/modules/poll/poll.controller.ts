import { Controller, Get } from '@nestjs/common';
import { PollService } from './poll.service';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get('/questions')
  async getQuestions() {
    const data = await this.pollService.getQuestions();
    return { data };
  }

  @Get('/vote')
  async storeVote() {
    const data = await this.pollService.storeVote();
    return { data };
  }
}
