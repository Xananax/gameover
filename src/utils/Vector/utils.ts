/// <reference path="./Vector.d.ts" />

export const dimensionStringFromNumber = (n:number) => (n==0 && 'x' || n==1 && 'y' || n==2 && 'z' || 'u');
export const degrees = 180 / Math.PI;
export const toDegrees = (rad:number):number => rad * degrees;
export const toRadians = (deg:number):number => deg / degrees;
export const random = (min, max, rand:Function=Math.random):number => Math.floor(rand() * (max - min + 1) + min);