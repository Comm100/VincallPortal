import simpleRestProvider from "ra-data-simple-rest";

export const restDataProviderFactory = (serverURL: string) => {
  const restProvider = simpleRestProvider(serverURL);
  return new Proxy(restProvider, {
    get: (target, name, self) =>
      name === "then" // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
        ? self
        : (resource: string, params: any) =>
            new Promise((resolve) =>
              setTimeout(
                () => resolve(restProvider[name as string](resource, params)),
                500
              )
            ),
  });
};
