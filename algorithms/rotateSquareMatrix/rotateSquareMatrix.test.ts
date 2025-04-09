import { rotateSquareMatrixCounterClockwise } from './rotateSquareMatrix';

const INVALID_INPUT_MESSAGE = 'Invalid matrix, please provide a square matrix.';

describe('rotateSquareMatrixCounterClockwise', () => {
  it('should return an error message for a null or undefined matrix', () => {
    expect(rotateSquareMatrixCounterClockwise(null as any)).toBe(
      INVALID_INPUT_MESSAGE
    );
    expect(rotateSquareMatrixCounterClockwise(undefined as any)).toBe(
      INVALID_INPUT_MESSAGE
    );
  });

  it('should return an error message for an empty matrix', () => {
    const matrix: number[][] = [];
    expect(rotateSquareMatrixCounterClockwise(matrix)).toBe(
      INVALID_INPUT_MESSAGE
    );
  });

  it('should return an error message for a non-square matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(rotateSquareMatrixCounterClockwise(matrix)).toBe(
      INVALID_INPUT_MESSAGE
    );
  });

  it('should rotate a 1xx matrix 90 degrees counterclockwise', () => {
    const matrix = [[1]];
    expect(rotateSquareMatrixCounterClockwise(matrix)).toEqual([[1]]);
  });
  it('should rotate a 2x2 matrix 90 degrees counterclockwise', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      [2, 4],
      [1, 3],
    ];
    expect(rotateSquareMatrixCounterClockwise(matrix)).toEqual(expected);
  });

  it('should rotate a 3x3 matrix 90 degrees counterclockwise', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expected = [
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ];
    expect(rotateSquareMatrixCounterClockwise(matrix)).toEqual(expected);
  });

  it('should rotate a 4x4 matrix 90 degrees counterclockwise', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const expected = [
      [4, 8, 12, 16],
      [3, 7, 11, 15],
      [2, 6, 10, 14],
      [1, 5, 9, 13],
    ];
    expect(rotateSquareMatrixCounterClockwise(matrix)).toEqual(expected);
  });
});
