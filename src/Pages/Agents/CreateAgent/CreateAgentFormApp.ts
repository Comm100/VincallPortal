import { useRedirect } from "react-admin";

export interface CreateAgentFormAppProps {}

export interface CreateAgentFormApp {
  handleClick: () => void;
}

export const createAgentFormApp = ({}: CreateAgentFormAppProps): CreateAgentFormApp => {
  const redirect = useRedirect();
  const handleClick = () => {
    redirect("/agents");
  };

  return {
    handleClick,
  };
};
