import { Suspense } from "react";
import Email_Verify from "./email_verify"
import LoadingModal from "@/app/components/Loadingpage";

export default function Page() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <Email_Verify />
    </Suspense>
  );
}
