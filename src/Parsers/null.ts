import IParser from './IParser';
import { INil } from '../types';

export default class NullParser implements IParser<INil> {
  Parse() {
    return null;
  }
  Serialize() {
    return '';
  }
}
