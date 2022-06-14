import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { useLocation } from "react-router-dom";

export interface LoginAppProps {}

export interface LoginApp {
  loading: boolean;
  handleSubmit: (auth: FormValues) => void;
}

export interface FormValues {
  username?: string;
  password?: string;
}

export const loginApp = ({}: LoginAppProps): LoginApp => {
  const [loading, setLoading] = useState(false);

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = (auth: FormValues) => {
    setLoading(true);
    login(
      auth,
      location.state ? (location.state as any).nextPathname : "/"
    ).catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        {
          type: "warning",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
    });
  };

  return {
    loading,
    handleSubmit,
  };
};
