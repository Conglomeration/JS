import IParser from './IParser';
import { TypeException } from '../Exceptions';

export default class UDimParser implements IParser<any> {
  Parse(s:string) {
    if (s || !s) // Bypass Dead Code Detection, fix ts
      throw new TypeException('Cannot parse UserDatas.');
    return {};
  }
  Serialize(s: any) {
    if (s || !s) // Bypass Dead Code Detection, fix ts
      throw new TypeException('Cannot serialize UserDatas. (Wait how the hell did you get one in JS anyways?)');
    return '';
  }
}
