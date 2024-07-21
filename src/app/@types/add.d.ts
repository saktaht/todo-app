import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid'

declare type AddTaskProps = {
  value: string;
  readonly id: string;
  checked?: boolean;
  remove?: boolean;
  hour: number;
};

declare type FilterType = 'all' | 'checked' | 'unchecked' | 'removed';