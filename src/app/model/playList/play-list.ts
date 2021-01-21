import {ISong} from '../song/ISong';
import {ICategory} from '../category/ICategory';
import {User} from '../user';

export interface PlayList {
  id?: number;
  name?: string;
  category?: ICategory;
  user?: User;
  views?: number;
  description?: string;
  song?: ISong[];
}
