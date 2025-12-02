import type React from "react";

import { Box } from "@radix-ui/themes";
import FormTextInput from "@theme/ApiExplorer/FormTextInput";
import { type Param, setParam } from "@theme/ApiExplorer/ParamOptions/slice";
import { useTypedDispatch } from "@theme/ApiItem/hooks";

export interface ParamProps {
  param: Param;
}

export default function ParamTextFormItem(props: ParamProps) {
  const { param } = props;
  const prefix = param["x-docusaurus-example-prefix"] || "";

  const dispatch = useTypedDispatch();
  return (
    <Box asChild my="2">
      <FormTextInput
        isRequired={param.required}
        paramName={param.name}
        placeholder={param.description || param.name}
        prefix={prefix}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log("DISPATCH", e);
          return dispatch(
            setParam({
              ...param,
              value:
                param.in === "path" || param.in === "query"
                  ? `${prefix}${e.target.value.replace(/\s/g, "%20")}`
                  : `${prefix}${e.target.value}`,
            }),
          );
        }}
      />
    </Box>
  );
}
