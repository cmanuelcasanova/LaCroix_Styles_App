import { Suspense } from "react";
import NewProduct from "./NewProduct";
import LoadingModal from "@/app/components/Loadingpage";

export default function Page() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <NewProduct />
    </Suspense>
  );
}
