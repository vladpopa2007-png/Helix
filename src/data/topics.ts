import { Topic } from '../types';
import { biologyTopics } from './topics/biologie';
import { chemistryTopics } from './topics/chimie';

export const topics: Topic[] = [
  ...biologyTopics,
  ...chemistryTopics
];
