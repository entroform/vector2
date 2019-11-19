export default interface PointLike {
  x: number;
  y: number;
  [key: string]: any;
}

export function isPointLike(point: any): boolean {
  return (
       typeof point   === 'object'
    && typeof point.x === 'number'
    && typeof point.y === 'number'
  );
}