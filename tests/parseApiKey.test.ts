import { parseApiKey } from '../src/utils';

describe('parseApiKey', () => {
  const createScriptTag = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
  };

  afterEach(() => {
    document.head.innerHTML = ''; // テスト後にscriptタグをクリア
  });

  test('should parse the api-key from the current script tag', () => {
    createScriptTag('https://city.geolonia.com/v1/kagawa/takamatsu/api.js?api-key=12345');
    const apiKey = parseApiKey();
    expect(apiKey).toBe('12345');
  });

  test('should return null if there is no api-key in the script tag', () => {
    createScriptTag('https://city.geolonia.com/v1/kagawa/takamatsu/api.js');
    const apiKey = parseApiKey();
    expect(apiKey).toBeNull();
  });

  test('should return null if the script tag is missing', () => {
    const apiKey = parseApiKey();
    expect(apiKey).toBeNull();
  });

  test('should parse the api-key from the script tag even if there are multiple script tags', () => {
    createScriptTag('https://city.geolonia.com/v1/other/api.js');
    createScriptTag('https://city.geolonia.com/v1/kagawa/takamatsu/api.js?api-key=67890');
    const apiKey = parseApiKey();
    expect(apiKey).toBe('67890');
  });

  test('should handle relative script sources correctly', () => {
    createScriptTag('/v1/kagawa/takamatsu/api.js?api-key=abcde');
    const apiKey = parseApiKey();
    expect(apiKey).toBe('abcde');
  });
});
