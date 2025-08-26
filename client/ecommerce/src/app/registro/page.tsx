"use client";

import { useForm } from "react-hook-form";
import { useRegistroMutation } from "@/app/services/api/usersApi";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  username: string;
  agreeTerms: boolean;
};

export default function Signup() {
  const { register, handleSubmit } = useForm<FormData>();
  const [registro] = useRegistroMutation();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      
      const response = await registro(data).unwrap();
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error al registrar")
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen mx-4 mt-10">
      <div className="h-140 w-100 border bg-white rounded-3xl border-[#202b38] p-2  hover:border-[#677483] transition-colors duration-800">
        <h1 className="  text-4xl pl-4 mt-12">Sing up</h1>

        <div className="text-black  flex flex-col p-4 pt-10">
          <form onSubmit={onSubmit} className="w-full">
            <label className="flex flex-col mb-4">
              Username
              <input
                className=" h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#fd298b] focus:shadow-[0_0_0_4px_#fe9ace]
                hover:border-[#677483] transition-colors duration-200"
                type="text"
                placeholder="input Email"
                required
                {...register("username")}
              />
            </label>

            <label className="flex flex-col  mb-4">
              Email
              <input
                className="h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#fd298b] focus:shadow-[0_0_0_4px_#fe9ace]
                hover:border-[#677483] transition-colors duration-200"
                type="text"
                placeholder="input Email"
                required
                {...register("email")}
              />
            </label>

            <label className="flex flex-col mb-4">
              Password
              <input
                className=" h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#fd298b] focus:shadow-[0_0_0_4px_#fe9ace]
                hover:border-[#677483] transition-colors duration-200"
                type="password"
                placeholder="Input Password"
                required
                {...register("password")}
              />
            </label>

            <label className="flex items-center gap-2 mt-6">
              <div className="relative w-5 h-5">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  required
                  className="peer appearance-none w-full h-full bg-[#ffffff] border border-[#202b38] rounded checked:bg-[#fd298b] transition-colors hover:border-[#677483] duration-200"
                />
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none peer-checked:opacity-100 opacity-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <span className="">I agree Terms & conditions</span>
            </label>

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-[#fd298b] w-[120px] rounded-md mt-4 h-10 mx-auto text-black font-semibold active:scale-95
                 transition-colors duration-300 ease-in-out hover:bg-[#677483] cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
