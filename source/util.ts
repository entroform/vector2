export type RangeArray = [number, number];
export type NumberOrRange = number | RangeArray;

export function isPointLike(point: any): boolean {
  return (
       typeof point   === 'object'
    && typeof point.x === 'number'
    && typeof point.y === 'number'
  );
}

export function hypotenuse(x: number, y: number): number {
  let max = Math.max(Math.abs(x), Math.abs(y));

  if (max === 0) {
    max = 1;
  }

  const min = Math.min(Math.abs(x), Math.abs(y));

  const n = min / max;

  return max * Math.sqrt(1 + n * n);
}

export function transform(
  value: number,
  from: NumberOrRange,
  to: NumberOrRange,
  clampResult: boolean = true,
): number {
  from = getRangeFromNumberOrRange(from);
  to = getRangeFromNumberOrRange(to);

  // Division by zero returns Infinite in JavaScript?
  let result = (value - from[0]) * ((to[1] - to[0]) / (from[1] - from[0])) + to[0];

  if (clampResult === true) {
    return clamp(result, to);
  }

  return result;
}

export function clamp(value: number, min: number, max: number): number;
export function clamp(value: number, range: NumberOrRange): number;
export function clamp(value: number, a: NumberOrRange, b?: number): number {
  let range: RangeArray;

  if (typeof a === 'number' && typeof b === 'number') {
    range = orderRangeArray([a, b]);
  } else if (
    isNumberOrRange(a) === true
    && typeof b === 'undefined'
  ) {
    range = getRangeFromNumberOrRange(a);
  } else {
    return value;
  }

  let [min, max] = orderRangeArray(range);

  return Math.max(min, Math.min(value, max));
}

export function getRangeFromNumberOrRange(range: NumberOrRange): RangeArray {
  if (typeof range === 'number') {
    return [0, range];
  }

  return range;
}

function isRangeArray(thing: any): boolean {
  return (
    Array.isArray(thing) === true
    && thing.length === 2
    && thing.every(member => typeof member === 'number')
  );
}

function isNumberOrRange(thing: any): boolean {
  return typeof thing === 'number' || isRangeArray(thing);
}

function orderRangeArray(range: RangeArray): RangeArray {
  const min = Math.min(...range);
  const max = Math.max(...range);

  return [min, max];
}

export function getEuclideanDistance(a: number, b: number): number {
  if (a === b) {
    return 0;
  }

  return Math.sqrt(Math.abs((a - b) * (b - a)));
}

export function cycleNumber(value: number, range: NumberOrRange): number {
  range = getRangeFromNumberOrRange(range);

  const [min, max] = orderRangeArray(range);

  if (min === 0 && max === 0) {
    return 0;
  }

  const da = getEuclideanDistance(min, max);

  if (value > max) {
    let db = getEuclideanDistance(value, max);

    let c = (db % da) + min;

    if (c === min) {
      return max;
    }

    return c;
  } else if (value < min) {
    let db = getEuclideanDistance(value, min);

    let c = max - (db % da);

    if (c === max) {
      return min;
    }

    return c;
  }

  return value;
}

export function lerp(t: number, from: number, to: number): number {
  return (1 - t) * from + t * to;
}

export function cubicBezier(t: number, p1: number, cp1: number, cp2: number, p2: number): number {
  return (
    Math.pow(1 - t, 3) * p1 +
    3 * t * Math.pow(1 - t, 2) * cp1 +
    3 * t * t * (1 - t) * cp2 +
    t * t * t * p2
  );
}