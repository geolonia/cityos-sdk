import { parseApiKey } from '../src/utils';

describe('parseApiKey', () => {
  const createScriptTag = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    return script;
  };

  afterEach(() => {
    document.head.innerHTML = ''; // テスト後にscriptタグをクリア
  });

  test('should parse the api-key from the current script tag', () => {
    const script = createScriptTag('https://city.geolonia.com/v1/kagawa/takamatsu/api.js?api-key=12345');
    const apiKey = parseApiKey(script);
    expect(apiKey).toBe('12345');
  });

  test('should return null if there is no api-key in the script tag', () => {
    const script = createScriptTag('https://city.geolonia.com/v1/kagawa/takamatsu/api.js');
    const apiKey = parseApiKey(script);
    expect(apiKey).toBeNull();
  });

  test('should handle relative script sources correctly', () => {
    const script = createScriptTag('/v1/kagawa/takamatsu/api.js?api-key=abcde');
    const apiKey = parseApiKey(script);
    expect(apiKey).toBe('abcde');
  });
});
