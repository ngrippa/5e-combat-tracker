import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Checkbox, FormControlLabel, SxProps } from "@mui/material";

export const FormCheckbox = <T extends FieldValues>(props: {
  name: FieldPath<T>;
  label?: string;
  sx?: SxProps;
}) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={field.value} />}
          label={props.label ?? props.name}
        />
      )}
    />
  );
};
