import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid'

export type AddTaskProps = {
  value: string;
  readonly id: string;
  checked?: boolean;
  remove?: boolean;
};

export type FilterType = 'all' | 'checked' | 'unchecked' | 'removed';