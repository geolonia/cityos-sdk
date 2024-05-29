/**
 * Parses the API key from the URL of the current script tag.
 *
 * @param {HTMLScriptElement} script - The current script tag.
 */
export const parseApiKey = (script: HTMLScriptElement) => {

  let apiKey: string | null = null;

  const url = new URL(
    (
      script.src.startsWith('https://') ||
      script.src.startsWith('http://') ||
      script.src.startsWith('//')
    ) ? script.src : `https://${location.host}/${script.src}`);

  const _apiKey = url.searchParams.get('api-key');

  if (_apiKey) {
    apiKey = _apiKey;
  }

  return apiKey;
}
