import React from "react";

import { ErrorMessage } from "@hookform/error-message";
import FormSelect from "@theme/ApiExplorer/FormSelect";
import { Param, setParam } from "@theme/ApiExplorer/ParamOptions/slice";
import { useTypedDispatch } from "@theme/ApiItem/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { SegmentedControl } from "@radix-ui/themes";

export interface ParamProps {
  param: Param;
}

export default function ParamBooleanFormItem({ param }: ParamProps) {
  const dispatch = useTypedDispatch();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const showErrorMessage = errors?.paramBoolean;

  return (
    <>
      <Controller
        control={control}
        rules={{ required: param.required ? "This field is required" : false }}
        name="paramBoolean"
        render={({ field: { onChange, name } }) => (
          <SegmentedControl.Root size="2" defaultValue="true">
            <SegmentedControl.Item value="true">true</SegmentedControl.Item>
            <SegmentedControl.Item value="false">false</SegmentedControl.Item>
          </SegmentedControl.Root>
        )}
      />
      {showErrorMessage && (
        <ErrorMessage
          errors={errors}
          name="paramBoolean"
          render={({ message }) => (
            <div className="openapi-explorer__input-error">{message}</div>
          )}
        />
      )}
    </>
  );
}
