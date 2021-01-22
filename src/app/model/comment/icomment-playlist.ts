import {User} from '../user';
import {Playlist} from '../playList/playlist';

export interface ICommentPlaylist {
  id?: number;
  comment?: string;
  playList?: Playlist;
  user?: User;
  date?: any;
}
