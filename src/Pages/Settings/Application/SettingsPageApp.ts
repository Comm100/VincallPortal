import { useDataProvider, useNotify } from "react-admin";
import { useState } from "react";

export interface Settings {
  id: number;
  optionKey: string;
  optionValue: string;
  type: number;
}

export interface SettingsPageAppProps {}

export interface SettingsPageApp {
  settingsList: Settings[];
  handleLoad: () => void;
  handleSave: (values: { [key: string]: any }, settings: Settings[]) => void;
}

export const settingsPageApp = ({}: SettingsPageAppProps): SettingsPageApp => {
  const [settingsList, setSettings] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const handleLoad = async () => {
    await dataProvider
      .httpGet("settings", {})
      .then((res: any) => setSettings(res.data));
  };

  const handleSave = (values: { [key: string]: any }, settings: any) => {
    settings.map(async (s: any) => {
      await dataProvider
        .updatePatch("setting", {
          id: s.id,
          data: { ...s, optionValue: values[s.optionKey.split(" ").join("")] },
        })
        .catch(() => {
          setError(true);
        });
    });
    if (error) {
      notify("Settings failed to save!", {
        type: "warning",
      });
    } else {
      notify("Settings saved successfully!", {
        type: "success",
      });
    }
  };

  return {
    settingsList,
    handleLoad,
    handleSave,
  };
};
