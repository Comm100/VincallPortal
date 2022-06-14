import { useMemo } from "react";
import { useGetList } from "react-admin";

export interface BindUserFormAppProps {}

export interface SelectOption {
  label: string;
  value: string;
}

export interface BindUserFormApp {
  userOptions: SelectOption[];
  isUserLoading: boolean;
}

export const bindUserFormApp = ({}: BindUserFormAppProps): BindUserFormApp => {
  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {
      meta: "all",
    },
    {
      refetchInterval: -1,
    }
  );
  const userOptions = useMemo(() => {
    return userList.map((user) => ({
      label: user.userName,
      value: user.userName,
    }));
  }, [userList]);

  return {
    userOptions,
    isUserLoading,
  };
};
