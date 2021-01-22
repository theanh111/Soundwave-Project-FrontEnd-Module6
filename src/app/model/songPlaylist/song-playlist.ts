import {ISong} from '../song/ISong';
import {Playlist} from '../playList/playlist';

export interface SongPlaylist {
  id?: number;
  song: ISong;
  playlist: Playlist;
}
