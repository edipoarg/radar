function fetchSingleUrlData<T>(url: string): Promise<T> {
  return fetch(url).then((r) => r.json());
}

export async function fetchUrlsData(
  urls: Record<string, string>,
): Promise<Record<string, unknown>> {
  /* Convert URLs into an array of promises of tuples consisting of
   * on one hand, the key of the URL,
   * and on the other, the response to the URL itself
   */
  const keyAndResponsePromises = Object.entries(urls).map(
    async ([key, url]): Promise<[string, unknown]> => [
      key,
      await fetchSingleUrlData(url),
    ],
  );
  const keyAndResponses = await Promise.all(keyAndResponsePromises);
  const urlsDataAccumulator: Record<string, unknown> = {};
  keyAndResponses.forEach(([key, response]) => {
    urlsDataAccumulator[key] = response;
  });
  return urlsDataAccumulator;
}
