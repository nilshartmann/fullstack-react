import logo from "./logo.png";
import LoadingIndicator from "@/components/LoadingIndicator";

export function GlobalLoadingIndicator() {
  return (
    <div className={"mt-8 h-full"}>
      <LoadingIndicator placeholder={<img src={logo} alt={"Logo"} />}>
        Stay tuned
      </LoadingIndicator>
    </div>
  );
}
