export function SliceArrayIntoChunks<T>(
  array: T[],
  chunkSize: number = 5
): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}