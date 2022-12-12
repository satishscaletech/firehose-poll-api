import { Module } from '@nestjs/common';
import { OptionProvider, QuestionProvider, VoteProvider } from 'src/providers';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

@Module({
  controllers: [PollController],
  providers: [
    PollService,
    ...QuestionProvider,
    ...OptionProvider,
    ...VoteProvider,
  ],
})
export class PollModule {}
