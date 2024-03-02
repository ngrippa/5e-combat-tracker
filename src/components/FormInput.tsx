import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { StyledTextField } from "./Form.tsx";
import {
  Autocomplete,
  AutocompleteProps,
  SxProps,
  TextFieldProps,
} from "@mui/material";
import { useMemo } from "react";

export const FormInput = <
  T extends FieldValues,
  AC extends Record<string, unknown> | undefined = undefined,
>(props: {
  name: FieldPath<T>;
  label?: string;
  type?: string;
  optional?: boolean;
  sx?: SxProps;
  area?: boolean;
  autocompleteProps?: Omit<
    AutocompleteProps<AC, false, false, true>,
    "renderInput"
  >;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const textFieldProps = useMemo<TextFieldProps>(() => {
    return {
      label: props.label ?? props.name,
      type: props.type,
      error: !!errors[props.name],
      helperText: (errors[props.name]?.message ?? "") as string,
      sx: props.sx,
      multiline: props.area,
      minRows: props.area ? 3 : 1,
    };
  }, [props, errors]);

  return (
    <Controller
      name={props.name}
      control={control}
      rules={{ required: props.optional ? false : "This field is required." }}
      render={({ field }) =>
        props.autocompleteProps ? (
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            {...props.autocompleteProps}
            renderInput={(params) => (
              <StyledTextField {...params} {...field} {...textFieldProps} />
            )}
          />
        ) : (
          <StyledTextField {...field} {...textFieldProps} />
        )
      }
    />
  );
};
