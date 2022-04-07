import { ConversionException } from '../Exceptions';
import IParser from './IParser';

export default class NumberParser implements IParser<number> {
  Parse(data: string) {
    const number = Number(data);
    if (!number || isNaN(number))
      throw new ConversionException('Not a number');
    return number;
  }
  Serialize(data: number) {
    return data.toString();
  }
}
