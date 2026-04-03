"use client";

import { useRouter } from "next/navigation";
import { useProfileQuery } from "@/app/services/api/usersApi";
import LoadingModal from "@/app/components/Loadingpage";
import { TbArrowBackUp } from "react-icons/tb";

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfileQuery();
  const router = useRouter();

  if (isLoading) return <LoadingModal />;
  if (!profile) {
    router.push("/login");
  }

  console.log(profile?.isVerified)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-4 mt-20 sm:mt-6 ">
      <div className="h-120 sm:w-100 w-80 mx-4 border bg-white border-[#202b38] p-2 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        <h1 className="  text-4xl pl-4 mt-12 mb-8">Perfil de Usuario</h1>

        <p>
          <strong>Nombre de usuario:</strong>{" "}
          <span className="text-black">{profile?.username}</span>
        </p>
        <p>
          <strong>UserId:</strong>{" "}
          <span className="text-black">{profile?.userId}</span>
        </p>
        <p>
          <strong>Role de Usuario:</strong>{" "}
          <span className="text-black">{profile?.role}</span>
        </p>
        <p className="flex flex-col items-start justify-start mb-2">
          <strong>Email:</strong>{" "}
          <span className="text-black">{profile?.email} <span> { profile?.isVerified ? "✅​" : "⚠️​"  } </span></span>
        </p>
        
        
        <p>
          <strong>Creado el:</strong>{" "}
          <span className="text-black">{profile?.createdAt}</span>
        </p>
        <p className="flex flex-col items-start justify-start">
          <strong>Última modificación:</strong>{" "}
          <span className="text-black">{profile?.updatedAt}</span>
        </p>
      </div>

      <button
        className="bg-white p-2 px-20 mt-4 shadow rounded-2xl flex flex-wrap items-center gap-2 hover:bg-gray-200 active:scale-95 transition-transform duration-150 ease-in-out"
        onClick={() => router.push("/")}
      >
        {" "}
        <>
          <TbArrowBackUp /> Volver{" "}
        </>
      </button>
    </div>
  );
}
