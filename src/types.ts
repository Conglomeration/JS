import {
  ConversionException, NotImplmentedException, OutOfBoundsException
} from './Exceptions';
const Lerp = (num0:number, num1:number, alpha:number)=> num0 * (1 - alpha) + num1 * alpha;

/** A basic colour */
export type IColor3 = {
  R: number;
  G: number;
  B: number;
};
export type IVector2 = {
  X: number;
  Y: number;
}
export type IVector3 = {
  X: number;
  Y: number;
  Z: number;
}
export type INil = null;
export type IUndefined = undefined;
/** Will error if attempted to be made */
export type IUserData = any;

/* ///////////// Classes /////////////// */
/**
 * 1:1 Implementation of Roblox Color3s
 * @see https://developer.roblox.com/en-us/api-reference/datatype/Color3
 * @author YieldingCoder
 */
export class Color3 implements IColor3 {
  _r: number;
  _g: number;
  _b: number;
  get r() {
    return this._r;
  }
  set r(value:number){
    if (value < 0 || value > 1)
      throw new OutOfBoundsException('r must be in range [0,1]');
    this._r = value;
  }
  get g() {
    return this._g;
  }
  set g(value:number){
    if (value < 0 || value > 1)
      throw new OutOfBoundsException('g must be in range [0,1]');
    this._g = value;
  }
  get b() {
    return this._b;
  }
  set b(value:number){
    if (value < 0 || value > 1)
      throw new OutOfBoundsException('b must be in range [0,1]');
    this._b = value;
  }
  get R() {
    return this.r;
  }
  set R(value:number){
    this.r = value;
  }
  get G() {
    return this.g;
  }
  set G(value:number){
    this.g = value;
  }
  get B() {
    return this.b;
  }
  set B(value:number){
    this.b = value;
  }
  constructor(r: number, g: number, b: number) {
    // if (r < 0 || g < 0 || b < 0 || r > 1 || g > 1 || b > 1)
    //   throw new OutOfBoundsException('r, g, b arguments of Color3.new must be in range [0,1]');
    this.r = r;
    this.g = g;
    this.b = b;
  }
  /** Convert from [0,1] RGB values (Color3.R,Color3.G,Color3.B) to [0,255] RGB Values */
  ToRGB() {
    return Color3.ToRGB(this);
  }
  ToHex() {
    const {
      R, G, B
    } = this.ToRGB();
    return `#${Color3.componentToHex(R)}${Color3.componentToHex(G)}${Color3.componentToHex(B)}`;
  }
  /** Convert to HSV (range [0,1] iirc) */
  ToHSV() {
    return Color3.ToHSV(this);
  }
  /** Returns a Color3 interpolated between two Color3 objects. Alpha is a number from 0 to 1. */
  lerp(color: IColor3, alphaf: number) {
    if (alphaf < 0 || alphaf > 1)
      throw new Error('alphaf must be in range [0,1]');
    throw new NotImplmentedException(null, color, alphaf); // remove unused argument warning
  }
  /** @internal Component to Hex */
  static componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${  hex}` : hex;
  }
  /** Static ToHSV */
  static ToHSV(clr3: IColor3) {
    const RGB = Color3.ToRGB(clr3);
    return Color3._RGBToHSV(RGB.R, RGB.G, RGB.B);
  }
  /** @internal @see https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately#17243070 */
  static _HSVToRGB(h:number, s:number, v:number) {
    let r: number, g: number, b: number;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    }
    return {
      'r': r * 255,
      'g': g * 255,
      'b': b * 255
    };
  }
  /** @internal @see https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately#17243070 */
  static _RGBToHSV(r:number, g:number, b:number) {
    const max = Math.max(r, g, b), min = Math.min(r, g, b),
      d = max - min,
      s = max === 0 ? 0 : d / max,
      v = max / 255;
    let h;

    switch (max) {
    case min: h = 0; break;
    case r: h = g - b + d * (g < b ? 6 : 0); h /= 6 * d; break;
    case g: h = b - r + d * 2; h /= 6 * d; break;
    case b: h = r - g + d * 4; h /= 6 * d; break;
    }

    return {
      'h': h,
      's': s,
      'v': v
    };
  }
  /** From RGB [0,1] to Color3 */
  static new(r:number, g:number, b:number) {
    return new Color3(r, g, b);
  }
  /** From RGB [0,255] to Color3 */
  static fromRGB(r: number, g: number, b: number) {
    return new Color3(r * 255, g * 255, b * 255);
  }
  /** From HSV [0,1] to Color3 */
  static fromHSV(h: number, s: number, v: number) {
    const RGB = this._HSVToRGB(h, s, v);
    return Color3.fromRGB(RGB.r, RGB.g, RGB.b);
  }
  /** From Hex [#000000,#ffffff] */
  static fromHex(hex:string) {
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result ? {
      'r': parseInt(result[1], 16),
      'g': parseInt(result[2], 16),
      'b': parseInt(result[3], 16)
    } : null;
    if (!rgb)
      throw new ConversionException(`Hex to Color3 conversion failed | Regex didn't return hex value for ${  hex}`);
    return Color3.fromRGB(rgb.r, rgb.g, rgb.b);
  }
  /** From IColor3 to RGB [0,255] */
  static ToRGB(clr3: IColor3) {
    return {
      'R': clr3.R * 255,
      'G': clr3.G * 255,
      'B': clr3.B * 255
    };
  }
}
/**
 * 1:1 Implementation of Roblox Vector2s
 * @see https://developer.roblox.com/en-us/api-reference/datatype/Vector2
 * @see https://github.com/dogancoruh/Javascript-Vector2/blob/02e7a97e6aefb1955b1b02f32a0ee3ade7573533/js/vector2.js (big thanks for the math, too lazy to do it myself at 3am on a monday)
 * @author YieldingCoder
 */
export class Vector2 implements IVector2 {
  X: number;
  Y: number;
  get x(){
    return this.X;
  }
  set x(v:number){
    this.X = v;
  }
  get y(){
    return this.Y;
  }
  set y(v:number){
    this.Y = v;
  }
  /** Length of the vector; calculated on property get */
  get Magnitude() {
    return Math.sqrt(this.X * this.X + this.Y * this.Y);
  }
  /** Normalized version of the vector; calculated on property get */
  get Unit(){
    const mag = this.Magnitude;
    return new Vector2(this.x / mag, this.y / mag);
  }
  /** Returns the cross product between this and `in` */
  Cross(v2: IVector2) {
    return Vector2.Cross(this, v2);
  }
  /** Returns a scalar dot product of this and v2. */
  Dot(v2: IVector2) {
    return Vector2.Dot(this, v2);
  }
  /** Returns a Vector2 linearly interpolated between this Vector2 and v by the fraction alpha */
  Lerp(v2: IVector2, alpha: number) {
    return Vector2.Lerp(this, v2, alpha);
  }
  /** Returns a Vector2 where each component is the highest among the respective components of the provided Vector2s. */
  Max(...v2: IVector2[]) {
    return Vector2.Max(this, ...v2);
  }
  /** Returns a Vector2 where each component is the lowest among the respective components of the provided Vector2s. */
  Min(...v2: IVector2[]) {
    return Vector2.Min(this, ...v2);
  }
  /** Not available on Roblox API (yet) | Returns a Vector2 where each component is the average among the respective components of the provided Vector2s. */
  Avg(...v2: IVector2[]) {
    return Vector2.Avg(this, ...v2);
  }
  constructor(x:number, y:number){
    this.X = x;
    this.Y = y;
  }
  static new(x:number, y:number){
    return new Vector2(x, y);
  }
  /** A Vector2 with a magnitude of zero. */
  static zero = new Vector2(0, 0);
  /** A Vector2 with a magnitude of one. */
  static one = new Vector2(1, 1);
  /** A Vector2 with a value of 1 on the X axis. */
  static xAxis = new Vector2(1, 0);
  /** A Vector2 with a value of 1 on the X axis. */
  static yAxis = new Vector2(0, 1);
  /** Not available on Roblox API | Returns the cross product of two given vectors */
  static Cross(v1:IVector2, v2:IVector2) {
    return v1.X * v2.Y - v2.X * v1.Y;
  }
  /** Not available on Roblox API | Returns a scalar dot product of the two given vectors */
  static Dot(v1:IVector2, v2:IVector2) {
    return v1.X * v2.X + v1.Y * v2.Y;
  }
  /** Not available on Roblox API | Returns a Vector2 linearly interpolated between v1 and v2 by the fraction alpha */
  static Lerp(v1: IVector2, v2: IVector2, alpha: number) {
    return new Vector2(Lerp(v1.X, v2.X, alpha), Lerp(v1.Y, v2.Y, alpha));
  }
  /** Not available on Roblox API | Returns a Vector2 where each component is the highest among the respective components of the provided Vector2s. */
  static Max(...v2: IVector2[]) {
    let MaxX = 0;
    let MaxY = 0;
    for (const v of v2) {
      MaxX = Math.max(MaxX, v.X);
      MaxY = Math.max(MaxY, v.Y);
    }
    return new Vector2(MaxX, MaxY);
  }
  /** Not available on Roblox API | Returns a Vector2 where each component is the lowest among the respective components of the provided Vector2s. */
  static Min(...v2: IVector2[]) {
    let MinX = 0;
    let MinY = 0;
    for (const v of v2) {
      MinX = Math.min(MinX, v.X);
      MinY = Math.min(MinY, v.Y);
    }
    return new Vector2(MinX, MinY);
  }
  /** Not available on Roblox API | Returns a Vector2 where each component is the average among the respective components of the provided Vector2s. */
  static Avg(...v2: IVector2[]) {
    let x = 0, y = 0, count = 0;
    for (const v of v2) {
      x += v.X;
      y += v.Y;
      count++;
    }
    x = x / count;
    y = y / count;
    return new Vector2(x, y);
  }
  /** Adds v2_1 to v2_2 */
  static Add(v2_1: IVector2, v2_2: IVector2) {
    return new Vector2(v2_1.X + v2_2.X, v2_1.Y + v2_2.Y);
  }
  /** Subtracts v2_2 from v2_1 */
  static Sub(v2_1: IVector2, v2_2: IVector2) {
    return new Vector2(v2_1.X - v2_2.X, v2_1.Y - v2_2.Y);
  }
  /** Multiplies v2_1 by v2_2 */
  static Multi(v2_1: IVector2, v2_2: IVector2 | number) {
    if (typeof v2_2 === 'number')
      return new Vector2(v2_1.X * v2_2, v2_1.Y * v2_2);
    else
      return new Vector2(v2_1.X * v2_2.X, v2_1.Y * v2_2.Y);
  }
  /** Multiplies v2_1 by v2_2 */
  static Mult(v2_1:IVector2, v2_2:IVector2|number) {
    return Vector2.Multi(v2_1, v2_2);
  }
  /** Divides v2_1 by v2_2 */
  static Div(v2_1: IVector2, v2_2: IVector2 | number) {
    if (typeof v2_2 === 'number')
      return new Vector2(v2_1.X / v2_2, v2_1.Y / v2_2);
    else
      return new Vector2(v2_1.X / v2_2.X, v2_1.Y / v2_2.Y);
  }
  /** Returns if 2 IVector2s are equal */
  static Eq(v2_1:IVector2, v2_2:IVector2){
    return v2_1.X === v2_2.X && v2_1.Y === v2_2.Y;
  }
}
// /**
//  * Basic Implementation of Roblox CFrames, containing just the information to Parse & Serialize from Conglomeration
//  * @see https://developer.roblox.com/en-us/api-reference/datatype/Color3
//  * @author YieldingCoder
//  */
