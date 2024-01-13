import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGlobalState } from "../../../state/State.tsx";
import { useChar } from "../charContext.ts";

export const ConcentrationCheck = (props: {
  setDamage: (damage: number) => void;
  damage: number;
}) => {
  const char = useChar();

  const { setCharacters } = useGlobalState();
  const handleClose = () => props.setDamage(0);
  return (
    <Dialog
      open={!!props.damage}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
      onSubmit={handleClose}
      onKeyDown={(event) => {
        if (props.damage && event.key === "Enter") handleClose();
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {`${char.name} muss einen Concentration Check machen.`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Der DC hierfür sollte DC{Math.max(10, Math.floor(props.damage / 2))}{" "}
          sein.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            setCharacters((d) => {
              d[char.id].concentrated = false;
            });
            handleClose();
          }}
        >
          Nicht geschafft
        </Button>
        {char.currentHp > 0 && (
          <Button onClick={handleClose} autoFocus>
            Geschafft!
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
