/**
 * Parses the API key from the URL of the current script tag.
 *
 * @param {Document} document
 */
export const parseApiKey = (doc: Document = document) => {
  const scripts: HTMLScriptElement[] | HTMLCollectionOf<HTMLScriptElement> = doc.currentScript ?
    [doc.currentScript as HTMLScriptElement]
    :
    doc.getElementsByTagName('script');

  let apiKey: string | null = null;

  for (const script of scripts) {
    const url = new URL(
      (
        script.src.startsWith('https://') ||
        script.src.startsWith('http://') ||
        script.src.startsWith('//')
      ) ? script.src : `https://${location.host}/${script.src}`);

    const _apiKey = url.searchParams.get('api-key');

    if (_apiKey) {
      apiKey = _apiKey;
      break;
    }
  }

  return apiKey;
}
