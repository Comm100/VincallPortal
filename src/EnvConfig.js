const devEnv = {
  serverUrl: "https://api.vincall.net/api",
  routeUrl: "https://route.comm100.io",
  useMockServer: false,
};

const testEnv = {
  serverUrl: "https://apitest.vincall.net/api",
  routeUrl: "https://voiproute.testing.comm100dev.io",
  useMockServer: false,
};

const proEnv = {
  serverUrl: "https://api.vincall.net/api",
  routeUrl: "https://route.comm100.io",
  useMockServer: false,
};

export const EnvConfig =
  location.host === "www.vincall.net"
    ? proEnv
    : location.host === "wwwtest.vincall.net"
    ? testEnv
    : devEnv;
