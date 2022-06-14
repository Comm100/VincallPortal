import { Card } from "@mui/material";
import { useListContext } from "react-admin";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { ReportItemBo } from "./ReportPage";

export const ReportChart = () => {
  const { data, isLoading } = useListContext<ReportItemBo>();
  if (isLoading) {
    return null;
  }
  return (
    <Card sx={{ height: 500 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
          barSize={20}
        >
          <XAxis dataKey="userName" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={tooltipFormatter} />
          <Legend
            formatter={(value, entry, index) => {
              return legendLabel[value];
            }}
          />
          <Bar dataKey="incomingCall" stackId="a" fill="#8884d8" />
          <Bar dataKey="outboundCall" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

const legendLabel: any = {
  incomingCall: "Incoming Call",
  outboundCall: "Outbound Call",
};

const tooltipFormatter = (value: any, name: any, props: any) => {
  return [value, legendLabel[name]];
};
