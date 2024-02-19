type RadarFetchError = {
  description: string;
  error: unknown;
};

type RadarResponse = string | RadarFetchError;

async function fetchSingleUrlData(url: string): Promise<RadarResponse> {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    return {
      description: `Failed fetching ${url}`,
      error: e,
    };
  }
}

export async function fetchUrlsData(
  urls: Record<string, string>,
): Promise<Record<string, RadarResponse>> {
  /* Convert URLs into an array of promises of tuples consisting of
   * on one hand, the key of the URL,
   * and on the other, the response to the URL itself
   */
  const keyAndResponsePromises = Object.entries(urls).map(
    async ([key, url]): Promise<[string, RadarResponse]> => [
      key,
      await fetchSingleUrlData(url),
    ],
  );
  const keyAndResponses = await Promise.all(keyAndResponsePromises);
  const urlsDataAccumulator: Record<string, RadarResponse> = {};
  keyAndResponses.forEach(([key, response]) => {
    urlsDataAccumulator[key] = response;
  });
  return urlsDataAccumulator;
}
