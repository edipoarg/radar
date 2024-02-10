function fetchSingleUrlData(url: string): Promise<string> {
  return fetch(url).then((r) => r.json());
}

export async function fetchUrlsData(
  urls: Record<string, string>,
): Promise<Record<string, string>> {
  /* Convert URLs into an array of promises of tuples consisting of
   * on one hand, the key of the URL,
   * and on the other, the response to the URL itself
   */
  const keyAndResponsePromises = Object.entries(urls).map(
    async ([key, url]): Promise<[string, string]> => [
      key,
      await fetchSingleUrlData(url),
    ],
  );
  const keyAndResponses = await Promise.all(keyAndResponsePromises);
  const urlsDataAccumulator: Record<string, string> = {};
  keyAndResponses.forEach(([key, response]) => {
    urlsDataAccumulator[key] = response;
  });
  return urlsDataAccumulator;
}
