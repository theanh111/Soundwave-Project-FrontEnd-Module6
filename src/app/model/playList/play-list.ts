import {ICategory} from '../category/ICategory';
import {User} from '../user';
import {ISong} from '../song/ISong';

export interface PlayList {
  id?: number;
  name?: string;
  category?: ICategory;
  user?: User;
  views?: number;
  description?: string;
  song?: ISong[];
}
