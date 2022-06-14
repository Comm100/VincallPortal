import { ChangeEvent } from "../../types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { NumberButton } from "./NumberButton";
import CallIcon from "@mui/icons-material/Call";
import BackspaceIcon from "@mui/icons-material/Backspace";
import VoiceMailIcon from "@mui/icons-material/Voicemail";

export interface NumberScreenProps {
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent) => void;
  onCall: () => void;
}

export const NumberScreen = ({
  value,
  disabled,
  onChange,
  onCall,
}: NumberScreenProps) => {
  const handleCall = () => {
    onCall();
  };
  const handleNumberTyping = (c?: number | string) => {
    onChange({ target: { value: value + String(c) } });
  };

  const handleNumberDelete = () => {
    if (!value) {
      return;
    }
    onChange({ target: { value: value.substring(0, value.length - 1) } });
  };

  return (
    <Paper
      sx={{ width: 240, height: 486, padding: 4, boxSizing: "content-box" }}
      elevation={1}
    >
      <Box>
        <TextField
          placeholder="Type number."
          value={value}
          onChange={onChange}
          variant="outlined"
          disabled={disabled}
          sx={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ paddingTop: 1 }}>
        <Grid container>
          {numberItems.map((c) => (
            <Grid item xs={4} key={c} sx={{ padding: 1 }}>
              <NumberButton onClick={handleNumberTyping} character={c}>
                {c}
              </NumberButton>
            </Grid>
          ))}
          <Grid item xs={4} key="delete" sx={{ padding: 1 }}>
            <NumberButton onClick={handleNumberDelete} character="delete">
              <BackspaceIcon />
            </NumberButton>
          </Grid>
          <Grid item xs={4} key="Call" sx={{ padding: 1 }}>
            <NumberButton
              onClick={handleCall}
              character="call"
              color="success"
              variant="contained"
              disabled={disabled}
            >
              <CallIcon />
            </NumberButton>
          </Grid>
          <Grid item xs={4} key="voicemail" sx={{ padding: 1 }}>
            <NumberButton onClick={() => {}}>
              <VoiceMailIcon />
            </NumberButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const numberItems: Array<number | string> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "*",
  0,
  "#",
];
