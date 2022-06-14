import FakeRest from "fakerest";
import fetchMock from "fetch-mock";
import { mockdata } from "./mockdata";

// only install the mocks once
// this is necessary with react@18 in StrictMode
let fakeServer: any;

export const fakeServerFactory = (serverURL: string) => {
  if (!fakeServer) {
    const restServer = new FakeRest.FetchServer(serverURL);
    if (window) {
      window.restServer = restServer; // give way to update data in the console
    }
    restServer.init(mockdata);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock(`begin:${serverURL}`, restServer.getHandler());
    fakeServer = () => fetchMock.restore();
  }
  return fakeServer;
};
