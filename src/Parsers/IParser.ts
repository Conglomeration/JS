export default interface IParser<Type> {
  /** Convert from String to `Type` */
  Parse(data: string): Type;
  /** Convert from `Type` to String */
  Serialize(data: Type): string;
// semi was having stroke
// eslint-disable-next-line semi
};

