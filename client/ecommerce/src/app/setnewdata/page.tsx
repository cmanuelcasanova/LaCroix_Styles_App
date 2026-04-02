import { Suspense } from "react";
import SetNewPass from "./setnewdata"
import LoadingModal from "@/app/components/Loadingpage";

export default function Page() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <SetNewPass />
    </Suspense>
  );
}
