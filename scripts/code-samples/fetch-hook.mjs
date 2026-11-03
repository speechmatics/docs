/**
 * Preloaded into JavaScript code samples under test (`node --import`): sends
 * every request for a speechmatics.com host to the mock server instead, so a
 * sample can keep its real URLs, or its SDK's defaults.
 */
const mock = new URL(process.env.CODE_SAMPLES_MOCK_ORIGIN);
const realFetch = globalThis.fetch;

function redirect(href) {
  const url = new URL(href);
  if (
    url.hostname === "speechmatics.com" ||
    url.hostname.endsWith(".speechmatics.com")
  ) {
    url.protocol = mock.protocol;
    url.host = mock.host;
  }
  return url;
}

globalThis.fetch = (input, init) =>
  input instanceof Request
    ? realFetch(new Request(redirect(input.url), input), init)
    : realFetch(redirect(String(input)), init);
