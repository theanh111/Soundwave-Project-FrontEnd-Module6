import {User} from '../user';
import {ISong} from '../song/ISong';

export interface LikeSong {
  id?: number;
  status?: boolean;
  user?: User;
  song?: ISong;
}
