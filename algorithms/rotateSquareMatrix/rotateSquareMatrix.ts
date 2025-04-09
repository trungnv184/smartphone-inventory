/**
 * Rotates a given NxN matrix 90 degrees counterclockwise.
 * @param matrix - The NxN matrix to rotate.
 * @returns The rotated matrix.
 */
export function rotateSquareMatrixCounterClockwise(matrix: number[][]): number[][] | string {
  if (!isSquareMatrix(matrix)) {
    return 'Invalid matrix, please provide a square matrix.';
  }

  const n = matrix.length;

  const rotatedMatrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotatedMatrix[n - j - 1][i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}

function isSquareMatrix(matrix: number[][]): boolean {
  if (!matrix || matrix.length == 0) return false;
  return matrix.every(row => row.length === matrix.length);
}
