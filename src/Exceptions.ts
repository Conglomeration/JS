export class NotImplmentedException extends Error {
  constructor(message?: string, ...argumentArgs: any[]) {
    super(message);
    this.name = 'NotImplmentedException';
    // remove warning
    argumentArgs = argumentArgs || [];
  }
}
export class ConversionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConversionException';
  }
}
export class OutOfBoundsException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'OutOfBoundsException';
  }
}
export class SecurityException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'SecurityException';
  }
}

export class TypeException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'TypeException';
  }
}
