import Button from "@mui/material/Button";
import { useProgressTurn } from "../../hooks/useProgressTurn.ts";
import { useGlobalState } from "../../state/State.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { charContext } from "../mainTable/charContext.ts";
import { StatusEffect } from "../mainTable/row/StatusEffect.tsx";

export const ProgressTurn = () => {
  const progressTurn = useProgressTurn();

  const { turnInfo, charactersDict, setOptions } = useGlobalState();
  const char = turnInfo ? charactersDict[turnInfo.currentChar] : null;

  return (
    <>
      <Button
        variant="outlined"
        color="success"
        onClick={async () => {
          if (!turnInfo) {
            setOptions((o) => {
              o.enterInitiative = false;
            });
          }
          progressTurn();
        }}
      >
        {turnInfo ? "Continue" : "Start"}
      </Button>
      {char && turnInfo && turnInfo.phase !== "mainTurn" && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={progressTurn}
          onSubmit={progressTurn}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.stopPropagation();
            event.preventDefault();
            progressTurn();
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {`${char.name} ist dran. Es gibt ${turnInfo.phase} Effekte:`}
          </DialogTitle>
          <DialogContent>
            <charContext.Provider value={char}>
              <StatusEffect type={turnInfo.phase} />
            </charContext.Provider>
          </DialogContent>
          <DialogActions>
            <Button color="success" autoFocus onClick={progressTurn}>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export const TurnInfoDialog = () => {};
