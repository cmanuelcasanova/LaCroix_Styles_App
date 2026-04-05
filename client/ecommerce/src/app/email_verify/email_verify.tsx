"use client";

import { useVerifyEmailMutation } from "@/app/services/api/usersApi";
import { useState, useEffect } from "react";
import LoadingModal from "@/app/components/Loadingpage";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useProfileQuery } from "../services/api/usersApi";

export default function Email_Verify() {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [verifyEmail] = useVerifyEmailMutation();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { data: profile, isLoading, error , refetch } = useProfileQuery();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const fverifyEmail = async () => {
      if (token) {
        try {
          const response = await verifyEmail({ token: token }).unwrap();
          toast("Correo verificado con Exito ✔️​");
          refetch()
          setIsVerified(true);
          
        } catch {
          toast("Error al Verificar");
         
        }
        finally {
            setLoading(false)
        }
      }
    };

    fverifyEmail();
  }, [token]);

  if (!token) {
    router.push("/login");
  }
  if (loading) return <LoadingModal />

  return (

    
    <div className="flex justify-center items-center min-h-screen mx-4 mt-4 sm:mt-10 ">
    
      <Toaster />
      <div className="flex flex-col items-center justify-start h-100 w-100 border bg-white border-[#202b38] p-2 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        <h1 className="text-2xl mt-10">Confirmacion de Email</h1>

        {isVerified ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <h1> Su cuenta ha sido verificada con Exito </h1>
            <FaCheckCircle className="text-green-400 mt-6" size={40} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <h1> Su cuenta no pudo ser verificada</h1>
             <h1> Enlace invalido </h1>
             <IoIosWarning className="text-red-400 mt-6" size={40}/>
          </div>
        )}

        <button
          onClick={()=> router.push("/login")}
          className=" w-30 bg-[#ff288b] my-12 mx-auto h-10 rounded-md text-black font-semibold active:scale-95
             transition-colors duration-300 ease-in-out hover:bg-[#fad6e0] "
        >
          ir a Login 
        </button>
      </div>
    </div>
  );
}
