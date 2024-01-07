import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const InvisibleInput = styled("input")({
  display: "none",
});

export const InvisibleSubmit = () => <InvisibleInput type="submit" />;

export const StyledTextField = styled(TextField)({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
});

export const SmallTextField = styled(StyledTextField)({ maxWidth: 100 });
