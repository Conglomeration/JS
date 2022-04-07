import IParser from './IParser';
import { SecurityException } from '../Exceptions';

export default class FunctionParser implements IParser<any> {
  // @ts-ignore
  Parse(s:string) {
    if (s.length > 0)
      throw new SecurityException('Not allowed to parse function');
    return ()=>{throw new SecurityException('Did not parse function due to security & cross-platform-compatability reasons.');};
  }
  Serialize() {
    return '';
  }
}
