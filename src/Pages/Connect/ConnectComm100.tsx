import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Form, Formik } from 'formik';
import { FormErrorMessageStyled  } from "../../StyledComponents/FormErrorMessageStyled";
import { connectComm100App } from "./Application/ConnectComm100App";
import * as Yup from "yup";
import { ConnectInfo } from "./Application/ConnectPageApp";

export interface ConnectComm100Props {
  connected: boolean;
  setConnected: (c: boolean) => void;
  triggerPageRefresh: (connected?: boolean) => void;
  connectInfo: ConnectInfo;
}

const validateSchema = Yup.object().shape({
  siteId: Yup.string().required("Site ID cannot be empty."),
});

export const ConnectComm100 = ({
  connected,
  setConnected,
  triggerPageRefresh,
  connectInfo,
}: ConnectComm100Props) => {
  const { handleConnect, handleDisconnect } = connectComm100App({
    setConnected,
    triggerPageRefresh,
    connectInfo,
  });

  return (
    <div style={{ height: 150 }}>
      {connected ? (
        <>
          <Typography>You are already connected.</Typography>
          <Typography>
            Connected Site ID:{" "}
            {localStorage.getItem("connectSiteId")}
          </Typography>
          <Button variant="contained" onClick={handleDisconnect}>
            Disconnect Comm100
          </Button>
        </>
      ) : (
        <>
          <Typography>
            You must connect to Comm100 to get account mappings, Please click
            the button below.
          </Typography>
          <Formik
            initialValues={{
              siteId: "",
            }}
            onSubmit={(values) => handleConnect(values)}
            validationSchema={validateSchema}
          >
            {({ errors, setFieldValue }) => {
              return (
                <Form>
                  <TextField 
                    id="siteId"
                    label="Site ID"
                    sx={{ width: 300 }}
                    onChange={(event) => 
                      setFieldValue("siteId", event.target.value || "")
                    }
                    error={!!errors.siteId}
                    variant="outlined"
                  />
                  {errors.siteId ? (
                    <FormErrorMessageStyled>{`${errors.siteId}`}</FormErrorMessageStyled>
                  ) : null}
                  <div>
                    <Button type="submit" variant="contained">
                      Connect Comm100
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </div>
  );
};
