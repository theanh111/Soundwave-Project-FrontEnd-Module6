import {ISong} from '../song/ISong';
import {PlayList} from '../playList/play-list';

export interface SongPlaylist {
  id?: number;
  song: ISong;
  playlist: PlayList;
}
