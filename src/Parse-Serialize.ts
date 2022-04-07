// Parses and encodes a simple header
import markers from './Markers';
import * as SemVer from 'semver';
import OurVersion from './standard-version';

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
    throw new ParsingError('Data must be a string');
  if (data.length === 0)
    throw new ParsingError('Data must not be an empty string');
  if (!data.startsWith(markers.FORMAT_VERSION_BEGIN))
    throw new ParsingError('Data Corrupted or from newer version (Data must start with the header marker)');
  const version = data.substring(markers.FORMAT_VERSION_BEGIN.length + 'STANDARD-'.length, data.indexOf(markers.FORMAT_VERSION_END));
  if (!SemVer.valid(version))
    throw new ParsingError('Data Corrupted (Data must contain a valid standard version)');
  const compared = SemVer.compare(version, OurVersion);
  if (compared > 0)
    throw new ParsingError('Data from newer standard (Data must be from an older or equal standard version)');
  if (compared < 0 && SemVer.compare(version, '0.1.0') < 0)
    throw new ParsingError('Data Corrupted (Standard 0.1.0 is the earlist supported version)');

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
