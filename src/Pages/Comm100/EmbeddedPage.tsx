import { useEffect, useRef } from "react";
import { Title } from "react-admin";
import { Card } from "@mui/material";

export interface EmbeddedPageProps {
  title: string;
  snippet: string;
}

export const EmbeddedPage = ({ title = "", snippet }: EmbeddedPageProps) => {
  const id = title.replace(/\s/g, "-");
  const elRef = useRef<any>(null);

  const init = (snippet: string) => {
    var iframe = document.createElement("iframe");
    elRef.current.appendChild(iframe);
    var innerDoc = iframe.contentDocument!;
    iframe.id = "comm100-iframe" + id;
    iframe.style.width = "100%";
    iframe.style.height = "720px";
    iframe.style.border = "none";
    innerDoc.open();
    innerDoc.write(snippet);
    innerDoc.close();
    return () => {
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
      // TODO: need fix.
      if (elRef.current) {
        elRef.current.isMounted = false;
      }
    };
  };

  useEffect(() => {
    if (elRef.current.isMounted) {
      return;
    }
    elRef.current.isMounted = true;
    return init(snippet);
  }, []);

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Title title={title} />
      <div id={"vincall-comm100-" + id} ref={elRef}></div>
    </Card>
  );
};
