import IParser from './IParser';
import { IUndefined } from '../types';

export default class NullParser implements IParser<IUndefined> {
  Parse() {
    return null;
  }
  Serialize() {
    return '';
  }
}
