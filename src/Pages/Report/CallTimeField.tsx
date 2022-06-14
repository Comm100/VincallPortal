import { useRecordContext } from "react-admin";
import { toCallTimeString } from "../../Helpers/Index";

export const CallTimeField = ({ source }: any) => {
  const record = useRecordContext();
  const time = record[source] || 0;
  return <span>{toCallTimeString(time)}</span>;
};
