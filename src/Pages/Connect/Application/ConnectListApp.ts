import { useState } from "react";
import { useGetList } from "react-admin";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";
import { MappingData } from "../ConnectList";

export interface ConnectListAppProps {}

export interface ConnectListApp {
  isUserLoading: boolean;
  mapping: MappingData[] | undefined;
  handleLoad: () => void;
}

export const connectListApp = ({}: ConnectListAppProps): ConnectListApp => {
  const [mapping, setMapping] = useState<MappingData[] | undefined>(undefined);
  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {
      meta: "all",
    },
    {
      refetchInterval: -1,
    }
  );

  const handleLoad = () => {
    customHttpClient(
      `${getServerURL()}/usermapping/${localStorage.getItem("connectSiteId")}`,
      {
        method: "GET",
      }
    ).then((res) => {
      const mappingUserList: MappingData[] = userList.map(
        (user: any, index: number) => {
          return {
            id: index,
            userAccount: user.account,
            userName: user.userName,
            comm100AgentId: "",
            comm100Email: "",
          };
        }
      );

      for (const userData of mappingUserList) {
        for (const mappingInfo of res.json) {
          if (userData.userAccount === mappingInfo.userAccount) {
            userData["comm100AgentId"] = mappingInfo["comm100AgentId"];
            userData["comm100Email"] = mappingInfo["comm100Email"];
          }
        }
      }

      setMapping(mappingUserList);
    });
  };

  return {
    isUserLoading,
    mapping,
    handleLoad,
  };
};
