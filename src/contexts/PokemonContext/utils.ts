const BASE_URL = 'https://pokeapi.co/api/v2';
const PAGE_LIMIT = 10000;

export const getFirstPageUrl = () => `${BASE_URL}/pokemon?limit=${PAGE_LIMIT}`;

export async function processPromisesInBatches(promises: Promise<any>[], batchSize: number) {
  const results = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }
  return results;
}
