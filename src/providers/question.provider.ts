import { Question } from 'src/models';

export const QuestionProvider = [
  {
    provide: 'QUESTION_REPOSITORY',
    useValue: Question,
  },
];
