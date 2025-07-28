import type React from "react";
import { forwardRef, useCallback } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { Text, TextField } from "@radix-ui/themes";
import { useController, useFormContext } from "react-hook-form";

export interface Props {
  isRequired?: boolean;
  paramName?: string;
  value?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  prefix?: string;
}

const FormTextInput = forwardRef<HTMLInputElement, Props>(
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
    console.log(props);

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
      (e: React.ChangeEvent<HTMLInputElement>) => {
        controller.field.onChange(e);
        props.onChange?.(e);
      },
      [controller, props.onChange],
    );

    return (
      <>
        <TextField.Root
          ref={ref}
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
    // return (
    //   <>
    //     {paramName ? (
    //       <input
    //         {...props}
    //         ref={ref}
    //         {...register(paramName, {
    //           required: isRequired ? "This field is required" : false,
    //         })}
    //         className={clsx("openapi-explorer__form-item-input", {
    //           error: showErrorMessage,
    //         })}
    //         type={password ? "password" : "text"}
    //         placeholder={placeholder}
    //         title={placeholder}
    //         value={value}
    //         onChange={onChange}
    //         autoComplete="off"
    //       />
    //     ) : (
    //       <input
    //         {...props}
    //         ref={ref}
    //         className="openapi-explorer__form-item-input"
    //         type={password ? "password" : "text"}
    //         placeholder={placeholder}
    //         title={placeholder}
    //         value={value}
    //         onChange={onChange}
    //         autoComplete="off"
    //       />
    //     )}
    //     {showErrorMessage && (
    //       <ErrorMessage
    //         errors={errors}
    //         name={paramName}
    //         render={({ message }) => (
    //           <div className="openapi-explorer__input-error">{message}</div>
    //         )}
    //       />
    //     )}
    //   </>
    // );
  },
);

export default FormTextInput;
