import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { StyledTextField } from "./Form.tsx";
import { SxProps } from "@mui/material";

export const FormInput = <T extends FieldValues>(props: {
  name: FieldPath<T>;
  label?: string;
  type?: string;
  optional?: boolean;
  sx?: SxProps;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <Controller
      name={props.name}
      control={control}
      rules={{ required: props.optional ? false : "This field is required." }}
      render={({ field }) => (
        <StyledTextField
          {...field}
          label={props.label ?? props.name}
          type={props.type}
          error={!!errors[props.name]}
          helperText={(errors[props.name]?.message ?? "") as string}
          sx={props.sx}
        />
      )}
    />
  );
};
