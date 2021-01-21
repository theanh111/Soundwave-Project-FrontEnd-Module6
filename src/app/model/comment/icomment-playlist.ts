import {User} from '../user';
import {PlayList} from '../playList/play-list';

export interface ICommentPlaylist {
  id?: number;
  comment?: string;
  playlist?: PlayList;
  user?: User;
  date?: any;
}
