import {ISong} from '../song/ISong';
import {User} from '../user';

export interface ICommentSong {
  id?: number;
  comment?: string;
  song?: ISong;
  user?: User;
  date?: any;
}
