import type React from "react";
import { forwardRef, useCallback, useEffect } from "react";

import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { ErrorMessage } from "@hookform/error-message";
import { Box, Text, TextArea, TextField } from "@radix-ui/themes";
import { useController, useFormContext } from "react-hook-form";

export interface Props {
  isRequired?: boolean;
  paramName?: string;
  value?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  prefix?: string;
}

const FormTextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      isRequired,
      value,
      placeholder,
      password,
      paramName,
      prefix,
      ...props
    }: Props,
    ref,
  ) => {
    placeholder = placeholder?.split("\n")[0];

    const {
      formState: { errors },
    } = useFormContext();

    const showErrorMessage = errors?.[paramName]?.message;

    const controller = useController({
      name: paramName,
      rules: {
        required: isRequired ? "This field is required" : false,
      },
    });

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        controller.field.onChange(e);
        props.onChange?.(e);
      },
      [controller, props.onChange],
    );

    const docId = useDoc().metadata.id;
    const isJobConfig =
      docId === "api-ref/batch/create-a-new-job" && paramName === "config";

    useEffect(() => {
      if (isJobConfig) {
        controller.field.onChange(ref?.current?.value);
      }
    }, [isJobConfig, controller]);

    if (isJobConfig) {
      return (
        <>
          <Box asChild my="2" minHeight="12em">
            <TextArea
              // Slightly bad typing here, if there's a better way I'd love to know it
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...props}
              value={controller.field.value}
              defaultValue={DEFAULT_JOB_CONFIG}
              onChange={onChange}
              style={{
                fontFamily: "var(--code-font-family)",
              }}
            />
          </Box>
          {showErrorMessage && (
            <ErrorMessage
              errors={errors}
              name={paramName}
              render={({ message }) => (
                <div className="openapi-explorer__input-error">{message}</div>
              )}
            />
          )}
        </>
      );
    }
    return (
      <>
        <TextField.Root
          // Slightly bad typing here, if there's a better way I'd love to know it
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
          type={password ? "password" : "text"}
          onChange={onChange}
        >
          <TextField.Slot>
            <Text color="gray">{prefix}</Text>
          </TextField.Slot>
        </TextField.Root>

        {showErrorMessage && (
          <ErrorMessage
            errors={errors}
            name={paramName}
            render={({ message }) => (
              <div className="openapi-explorer__input-error">{message}</div>
            )}
          />
        )}
      </>
    );
  },
);

const DEFAULT_JOB_CONFIG = JSON.stringify(
  {
    type: "transcription",
    transcription_config: {
      language: "en",
      operating_point: "enhanced",
    },
  },
  null,
  2,
);

export default FormTextInput;
