import { ArrowBigDown, ArrowBigUp } from "lucide-react";

export default function WebsocketMessageArrow({
  direction,
}: { direction: "up" | "down" }) {
  return direction === "up" ? (
    <ArrowBigUp
      size={24}
      aria-label="arrow-up"
      color="var(--green-10)"
      strokeWidth={2}
      style={{ verticalAlign: "middle" }}
    />
  ) : (
    <ArrowBigDown
      size={24}
      aria-label="arrow-down"
      color="var(--orange-10)"
      strokeWidth={2}
      style={{ verticalAlign: "middle" }}
    />
  );
}
