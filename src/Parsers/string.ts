import IParser from './IParser';

export default class StringParser implements IParser<string> {
  Parse(data: string): string {
    return data;
  }
  Serialize(data: string): string {
    return data;
  }
}
