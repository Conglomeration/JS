// Parses and encodes a simple header
import markers from './Markers';

export type ParsableTypes = undefined | null | number | string | boolean;
export type Parsable = ParsableTypes | { [name: string]: Parsable };
export type Serializable = Parsable | ParsableTypes | Serializable[] | { [name: string]: Serializable };

export class ParsingError extends Error {
  constructor(message: string, type?: string) {
    super(message);
    this.name = type ?? 'ParsingError';
  }
}

export class SerializingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SerializingError';
  }
}

export const Parse: (data:string)=>Record<string, Parsable> = (data: string)=>{
  if (typeof data !== 'string')
    throw 'not string';
  console.log('yee');
  return {};
};
export const Serialize: (data:Record<string, Parsable>)=>string  = (data:Record<string, Serializable>)=>{
  console.log('pog');
  return '';
};

const Exports = {
  Parse,
  Serialize,
};

export default Exports;
