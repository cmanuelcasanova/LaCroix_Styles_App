"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRecoverypassMutation } from "@/app/services/api/usersApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingModal from "@/app/components/Loadingpage"
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod"; 




type FormData = {
  email: string;
};

export default function Forgetpassword() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false)
  const [ recoverypass ] = useRecoverypassMutation ();
  const emailSchema = z.email()
  const router = useRouter();


  const onSubmit = handleSubmit(async (data) => {
    
    setLoading(true)
    try {

      
      if (emailSchema.safeParse(data.email).success){
        
        const response = await recoverypass({email:data.email}).unwrap();
        toast("✔️​ Correo de recuperacion enviado");
       
        //router.push("/");
      }else {

         toast("❌​ Es formato de correo invalido");

      }
       setLoading(false)
      

     
    } catch (error) {
      const serverError = error as { status:string,data: { message: string } };
      toast(serverError.status==='PARSING_ERROR' ? "⚠️​" + serverError.data : "⚠️​" + serverError.data.message)
      setLoading(false)
    }
  });



  if (loading) return <LoadingModal/>  

  return (
    <div className="flex justify-center items-center min-h-screen mx-4 mt-4 sm:mt-10 ">
    
      <Toaster />
      <div className="h-100 w-100 border bg-white border-[#202b38] p-2 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        
          
     
        
        <h1 className="  text-3xl pl-4 mt-12">Recuperar password</h1>

        <div className="text-[#8092a1] flex flex-col p-4 pt-10">
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items center"
          >
            <label className="flex flex-col mb-4">
              Email
              <input
                className=" h-10  border-[#202b38] border rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#ff288b] focus:shadow-[0_0_0_4px_#ffd5e1]
                hover:border-[#677483] transition-colors duration-200"
                type="text"
                placeholder="Ingrese Email recuperacion"
                required
                {...register("email")}
              />
            </label>


            <div className="flex flex-col w-full content-center justify-center items-center rounded-md h-18 mt-10 ">
              <button
                type="submit"
                className=" w-30 bg-[#ff288b] my-4 mx-auto h-full rounded-md text-black font-semibold active:scale-95
             transition-colors duration-300 ease-in-out hover:bg-[#fad6e0] "
              >
                Enviar
              </button>
            </div>

            <label className="mt-10 ">
              <h1 className="flex flex-warp gap-2 text-sm ">
                Dont have an account?{" "}
                <Link href="/registro">
                  {" "}
                  <h1 className="font-extrabold text-[#ff288b]">Sign Up</h1>
                </Link>{" "}
              </h1>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
