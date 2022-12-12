import { Vote } from 'src/models';

export const VoteProvider = [
  {
    provide: 'VOTE_REPOSITORY',
    useValue: Vote,
  },
];
