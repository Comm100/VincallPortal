import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId } from "./Index";

export const useIsComm100Connect = () => {
  const siteId = getConnectSiteId();
  const [isComm100Connect, setIsComm100Connect] = useState<boolean>(false);
  const dataProvider = useDataProvider();
  useEffect(() => {
    if (!siteId) {
      return;
    }
    dataProvider
      .httpGet("/connectState", { siteId })
      .then(
        ({
          data,
        }: {
          data: { connected: boolean; server: string; siteId: number };
        }) => {
          setIsComm100Connect(data?.connected);
        }
      );
  }, []);
  return isComm100Connect;
};
