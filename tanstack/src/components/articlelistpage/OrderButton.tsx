import { ReactNode } from "react";

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "DATE" | "CATEGORY" | "LIKES";
};
export function OrderButton({ orderBy, children }: OrderButtonProps) {
  return "todo - OrderButton!";
  // const params = useSearchParams();
  // const currentOrderBy = params.get("orderBy");
  //
  // const searchParams = new URLSearchParams(params);
  // if (orderBy) {
  //   searchParams.set("orderBy", orderBy);
  // } else {
  //   searchParams.delete("orderBy");
  // }
  //
  // if (currentOrderBy !== orderBy) {
  //   // when search order change, go back to first page
  //   searchParams.delete("page");
  // }
  //
  // const href = `/articles?${searchParams.toString()}`;
  //
  // const checked =
  //   orderBy?.toUpperCase() === (currentOrderBy?.toUpperCase() || undefined);
  //
  // return (
  //   <Button checked={checked}>
  //     <CheckLabel checked={checked}>
  //       {checked ? children : <Link href={href}>{children}</Link>}
  //     </CheckLabel>
  //   </Button>
  // );
}
