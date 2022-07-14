import { GlobalSettings } from "../CallPanel/types";
import { useComm100Snippet } from "../CallPanel/AgentConsolePanel";
import { Title } from "react-admin";
import { Card } from "@mui/material";

export interface ControlPanelProps {
  title: string;
  entry: string;
}

export const ControlPanel = ({ title, entry }: ControlPanelProps) => {
  const elementId = "comm100-controlpanel";
  useComm100Snippet(elementId, getInstall(entry));
  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Title title={title} />
      <div id={elementId} style={{ width: "100%", height: "720px" }}></div>
    </Card>
  );
};

function getInstall(entry: string) {
  return (arg: GlobalSettings, elementId: string, siteId: number) => {
    let s2: any;

    const s = document.createElement("script");
    s.src = arg.controlPanel;
    s.async = true;
    s.onload = () => {
      s2 = document.createElement("script");
      s2.innerHTML = `
        var controlPanel = new EmbeddedControlPanel({
          appId: "${arg.controlAppId}",
          siteId: ${siteId},
          entry: "${entry}",
          container: document.getElementById("${elementId}"),
        });
        controlPanel.init();
  `;
      document.body.appendChild(s2);
    };
    document.body.appendChild(s);
    return () => {
      if (s && s.parentNode) {
        s.parentNode.removeChild(s);
      }
      if (s2 && s2.parentNode) {
        s2.parentNode.removeChild(s2);
      }
    };
  };
}

// const getSnippet = (entry: string) => (arg: GlobalSettings, siteId: number) => {
//   return `
//     <div id="comm100-controlpanel" style="width:100%; height: 100%"></div>
//     <script src="${arg.controlPanel}/sdk/comm100-embeddable-sdk/"></script>
//     <script>
//       var controlPanel = new EmbeddedControlPanel({
//         appId: "${arg.controlAppId}",
//         siteId: ${siteId},
//         entry: "${entry}",
//         container: document.getElementById("comm100-controlpanel"),
//       });
//       controlPanel.init();
//     </script>
//   `;
// };
