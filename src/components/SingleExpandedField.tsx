import React, { PropsWithChildren, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InvisibleSubmit, StyledTextField } from "./Form.tsx";
import { ExpandedField } from "./ExpandedField.tsx";
import { Box, TextFieldProps } from "@mui/material";

type Form = { value: string };

export const SingleExpandedField = (
  props: PropsWithChildren<{
    title: string;
    success: (form: string) => void | Promise<void>;
    inputProps?: TextFieldProps;
    icon?: React.ReactNode;
  }>,
) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, reset } = useForm<Form>({
    defaultValues: { value: "" },
  });

  const onSuccess: SubmitHandler<Form> = (form) => {
    props.success(form.value);
    reset();
    handleClose();
  };

  return (
    <ExpandedField
      title={props.title}
      open={open}
      setOpen={setOpen}
      icon={props.icon}
    >
      {props.children}
      <Box mt={1}>
        <form onSubmit={handleSubmit(onSuccess)}>
          <Controller
            name="value"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledTextField
                autoFocus={true}
                {...field}
                {...props.inputProps}
              />
            )}
          />
          <InvisibleSubmit />
        </form>
      </Box>
    </ExpandedField>
  );
};
