import {
  cycle as cycleNumber,
} from '@nekobird/piko';

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function deltaClockwise(from: number, to: number, direction: boolean = false): number {
  let sign = 1;

  const range = from - Math.PI;

  if (range < 0) {
    const offset = cycleNumber(range, Math.PI * 2);

    if (to < from || to >= offset) {
      sign = -1;
    }
  } else if (to < from && to >= range) {
    sign = -1;
  }

  if (direction === false) {
    sign = 1;
  }

  let result = 0;

  if (from > to) {
    result = from - to;
  } else if (to > from) {
    result = to - from;
  }

  return result * sign;
}

export function deltaCounterclockwise(from: number, to: number, direction: boolean = false): number {
  let sign = 1;

  const range = from + Math.PI;

  if (range > Math.PI * 2) {
    const offset = cycleNumber(range, Math.PI * 2);

    if (to > from || to <= offset) {
      sign = -1;
    }
  } else if (to > from && to <= range) {
    sign = -1;
  }

  if (direction === false) {
    sign = 1;
  }

  let result = 0;

  if (from > to) {
    result = from - to;
  } else if (to > from) {
    result = to - from;
  }

  return result * sign;
}

export function differenceClockwise(from: number, to: number) {
  let result = 0;

  if (from > to) {
    result = Math.PI * 2 - from + to;
  } else if (to > from) {
    result = to - from;
  }

  return result;
}

export function differenceCounterclockwise(from: number, to: number) {
  let result = 0;

  if (from > to) {
    result = from - to;
  } else if (to > from) {
    result = from + Math.PI * 2 - to;
  }

  return result;
}
