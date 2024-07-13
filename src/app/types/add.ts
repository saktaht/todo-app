import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid'

export type AddTaskProps = {
  value: string;
  readonly id: string;
};