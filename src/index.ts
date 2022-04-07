import * as Types from './types';

export const RobloxTypes = {
  'Vector2': Types.Vector2, 'Color3': Types.Color3, 'Nil': null
};

interface Library {
  RbxTypes: typeof RobloxTypes;
}

// @ts-ignore let me add things to the table overtime >:(
const exported: Library = {};
exported.RbxTypes = RobloxTypes;

export default exported;
