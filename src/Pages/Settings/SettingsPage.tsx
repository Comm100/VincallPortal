import { Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { Title } from "react-admin";
import { settingsPageApp } from "./Application/SettingsPageApp";
import { SettingsForm } from "./SettingsForm";

export const SettingsPage = () => {
  const { settingsList, handleLoad, handleSave } = settingsPageApp({});

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Card>
      <Title title="Settings" />
      <CardContent>
        <SettingsForm settings={settingsList} onSubmit={handleSave} />
      </CardContent>
    </Card>
  );
};
