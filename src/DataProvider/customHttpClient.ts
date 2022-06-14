import { fetchUtils, Options } from "ra-core";

export const customHttpClient = (url: string, options?: Options) => {
  let _options = options;
  if (!_options) {
    _options = {};
  }
  _options.credentials = "include";

  return fetchUtils.fetchJson(url, _options);
};
