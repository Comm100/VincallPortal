import { Admin, Resource, CustomRoutes } from "react-admin";
import { AgentList } from "./Pages/Agents/AgentList";
import { Layout } from "./Layout/Layout";
import { Login } from "./Pages/Login/Login";
import { UserList } from "./Pages/UserManage/UserList";
import { CreateAgentForm } from "./Pages/Agents/CreateAgent/CreateAgentForm";
import { SettingsPage } from "./Pages/Settings/SettingsPage";
import { Route } from "react-router-dom";
import { ReportPage } from "./Pages/Report/ReportPage";
import { CallPanelPage } from "./Pages/CallPanel/CallPanelPage";
import { EnvConfig } from "./EnvConfig";
import { dataProviderFactory } from "./DataProvider";
import { lightTheme } from "./Layout/Theme/Index";
import { authProvider } from "./AuthProvider/authProvider";
import { ControlPanel } from "./Pages/Comm100/ControlPanel";
import { ConnectPage } from "./Pages/Connect/ConnectPage";
import { PhoneDialer } from "./Pages/CallPanel/PhoneDialer";

export const getServerURL = () => {
  return EnvConfig.serverUrl;
};

export const App = function () {
  return (
    <Admin
      title="Vin Call"
      dataProvider={dataProviderFactory(getServerURL())}
      loginPage={Login}
      layout={Layout}
      theme={lightTheme}
      authProvider={authProvider}
    >
      <Resource
        name="agents"
        options={{ label: "Agents" }}
        list={AgentList}
        create={CreateAgentForm}
      />
      <CustomRoutes>
        <Route path="/callpanel" element={<CallPanelPage />} />
      </CustomRoutes>

      <Resource
        name="reports"
        options={{ label: "Report" }}
        list={ReportPage}
      />
      <Resource
        name="users"
        options={{ label: "User Manage" }}
        list={UserList}
      />
      <CustomRoutes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route
          path="/installcode"
          element={
            <ControlPanel
              key="Install Code"
              title="Install Code"
              entry="/livechat/campaign/installation/"
            />
          }
        />
        <Route
          path="/chatvolume"
          element={
            <ControlPanel
              key="Chat Volume"
              title="Chat Volume"
              entry="/reporting/livechat/chatvolume/chatvolumebytime/"
            />
          }
        />
        <Route path="/phoneDialer" element={<PhoneDialer />} />
      </CustomRoutes>
    </Admin>
  );
};
