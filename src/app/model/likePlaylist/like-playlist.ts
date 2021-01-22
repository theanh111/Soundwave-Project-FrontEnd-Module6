import {User} from '../user';
import {ISong} from '../song/ISong';
import {Playlist} from '../playList/playlist';

export interface LikePlaylist {
  id?: number;
  status?: boolean;
  user?: User;
  song?: Playlist;
}
