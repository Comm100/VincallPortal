const devEnv = {
  serverUrl: "https://apivincall.comm100dev.io/api",
  routeUrl: "https://voiproute.comm100dev.io",
  redirectUrlDomain: "https://apivincall.comm100dev.io",
  useMockServer: false,
};

const testEnv = {
  serverUrl: "https://apitest.vincall.net/api",
  routeUrl: "https://voiproute.testing.comm100dev.io",
  redirectUrlDomain: "https://apitest.vincall.net",
  useMockServer: false,
};

const proEvn = {
  serverUrl: "https://api.vincall.net/api",
  routeUrl: "https://route.comm100.io",
  redirectUrlDomain: "https://api.vincall.net",
};

export const EnvConfig =
  location.host === "www.vincall.net"
    ? proEvn
    : location.host === "wwwtest.vincall.net"
    ? testEnv
    : devEnv;
