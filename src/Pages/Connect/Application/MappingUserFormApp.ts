import { useState } from "react";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";

export interface MappingUserFormAppProps {}

export interface SelectOption {
  label: string;
  value: string;
}

export interface MappingUserFormApp {
  agentOptions: SelectOption[];
  isAgentLoading: boolean;
  handleLoad: () => void;
}

export const mappingUserFormApp = ({}: MappingUserFormAppProps): MappingUserFormApp => {
  const [agentOptions, setOptions] = useState<SelectOption[]>([]);
  const [isAgentLoading, setLoading] = useState<boolean>(true);
  const handleLoad = () => {
    setLoading(true);
    customHttpClient(
      `${getServerURL()}/comm100Agent/agents?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "GET",
      }
    ).then((res) => {
      setOptions(res.json.map((j: any) => ({ label: j.email, value: j.id })));
      setLoading(false);
    });
  };

  return {
    agentOptions,
    isAgentLoading,
    handleLoad,
  };
};
