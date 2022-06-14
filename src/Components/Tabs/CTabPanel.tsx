import Box from "@mui/material/Box";

export interface TabPanelProps {
  value: number;
  index: number;
  children: any;
}
export const CTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
};
