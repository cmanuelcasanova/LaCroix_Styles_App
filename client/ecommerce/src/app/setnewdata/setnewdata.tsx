"use client";
import { useForm } from "react-hook-form";
import { useRecoverypass_newMutation } from "@/app/services/api/usersApi";
import { useState } from "react";
import LoadingModal from "@/app/components/Loadingpage"
import toast, { Toaster } from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { useRouter , useSearchParams } from "next/navigation";



type FormData = {
  password: string;
  confirm: string
};

export default function SetNewPass() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const [ recoverypass_new ] = useRecoverypass_newMutation ();
  const [viewpassword, setviewPassword] = useState<boolean>(false)
  const [viewpasswordconfirm, setviewPasswordconfirm] = useState<boolean>(false)
  const searchParams = useSearchParams();
  const token = searchParams.get("token");


  const onSubmit = handleSubmit(async (data) => {
    
    setLoading(true)
    try {

      if(data.password && data.password===data.confirm ) {
        const response = await recoverypass_new({password_new:data.password,token:token}).unwrap();
      }else{
         toast("Deben ser iguales los password");
      }
     
      setLoading(false)
      toast("✔️​​Password actualizado");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast("❌​URl no valida o venció");
        setLoading(false)
    }
  });

 



   if(!token) {router.push("/login")}

  return (
    <div className="flex justify-center items-center min-h-screen mx-4 mt-4 sm:mt-10 ">
    
      {loading && <LoadingModal/>}  
      <Toaster />
      <div className="h-100 w-100 border bg-white border-[#202b38] p-2 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        
          
     
        
        <h1 className="  text-3xl pl-4 mt-12">Recuperar password</h1>

        <div className="text-[#8092a1] flex flex-col p-4 pt-10">
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items center"
          >
            <label className="flex flex-col mb-4">
              Nuevo Password
              <div className="flex flex-wrap items-center justify-start gap-2">
              <input
                className=" h-10 w-[80%] border-[#202b38] border rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#ff288b] focus:shadow-[0_0_0_4px_#ffd5e1]
                hover:border-[#677483] transition-colors duration-200"
                type={viewpassword ? "text" : "password"}
               
                required
                {...register("password")}
              />
              <FiEye size={20} onClick={()=>setviewPassword(!viewpassword)} />
              </div>
            </label>

                     <label className="flex flex-col mb-4">
              Confirmar Password
               <div className="flex flex-wrap items-center justify-start gap-2">
              <input
                className=" h-10 w-[80%] border-[#202b38] border rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#ff288b] focus:shadow-[0_0_0_4px_#ffd5e1]
                hover:border-[#677483] transition-colors duration-200"
                type={viewpasswordconfirm ? "text" : "password"}
                
                required
                {...register("confirm")}
              />

              <FiEye size={20} onClick={()=>setviewPasswordconfirm(!viewpasswordconfirm)} />
              </div>
            </label>


            <div className="flex flex-col w-full content-center justify-center items-center rounded-md h-18 my-6 ">
              <button
                type="submit"
                className=" w-30 bg-[#ff288b] my-4 mx-auto h-full rounded-md text-black font-semibold active:scale-95
             transition-colors duration-300 ease-in-out hover:bg-[#fad6e0] "
              >
                Enviar
              </button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
}
