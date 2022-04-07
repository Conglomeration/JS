import IParser from './IParser';
import { INil } from '../types';

export default class NilParser implements IParser<INil> {
  Parse() {
    return null;
  }
  Serialize() {
    return '';
  }
}
