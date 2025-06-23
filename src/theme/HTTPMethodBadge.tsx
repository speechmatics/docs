import { Badge, Text } from "@radix-ui/themes";

export default function HTTPMethodBadge({
  method,
}: { method: "GET" | "POST" | "PUT" | "DELETE" }) {
  const color =
    method === "GET"
      ? "cyan"
      : method === "POST"
        ? "green"
        : method === "PUT"
          ? "yellow"
          : "red";
  return (
    <Badge color={color}>
      <Text weight="bold">{method}</Text>
    </Badge>
  );
}
