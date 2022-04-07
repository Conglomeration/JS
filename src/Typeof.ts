type Types = 'string' | 'number' | 'boolean' | 'table' | 'unknown' | 'null' | 'undefined';

export const Typeof: (input:any)=>Types = (a:any)=>{
  const LowercaseType = typeof a;
  switch (LowercaseType) {
  case 'string':
    return 'string';
  case 'number':
    return 'number';
  case 'boolean':
    return 'boolean';
  case 'object':
    if (a === null)
      return 'null';
    if (Array.isArray(a))
      return 'table'; // TODO: Use Array, implement array type to CGL.Lua, add to standard
    return 'table';
  case 'undefined':
    return 'undefined';
  default:
    return 'unknown';
  }
};
