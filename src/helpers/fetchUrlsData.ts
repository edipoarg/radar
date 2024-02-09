export async function fetchUrlsData(
  urls: Record<string, string>,
): Promise<Record<string, string>> {
  const data: Record<string, string> = {};
  for (const [k, u] of Object.entries(urls)) {
    await fetch(u).then(async (r) => {
      data[k] = await r.json();
    });
  }
  return data;
}
