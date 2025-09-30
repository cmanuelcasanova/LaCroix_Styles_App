"use client";


import { useRouter } from "next/navigation";
import { useProfileQuery } from "@/app/services/api/usersApi";
import LoadingModal from "@/app/components/Loadingpage";



export default function ProfilePage() {

 
  const { data: profile, isLoading } = useProfileQuery();
  const router = useRouter();

  if (isLoading) return <LoadingModal />;
  if (!profile ) {router.push("/login") };


  return (
    <div className="flex justify-center items-center min-h-screen mx-4 mt-10 ">
      <div className="h-140 w-100 border bg-white border-[#202b38] p-2 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        <h1 className="  text-4xl pl-4 mt-12 mb-8">Perfil de Usuario</h1>

         <p><strong>Nombre de usuario:</strong> <span className="text-black">{profile?.username}</span></p>
         <p><strong>UserId:</strong> <span className="text-black">{profile?.userId}</span></p>
         <p><strong>Role de Usuario:</strong> <span className="text-black">{profile?.role}</span></p>
         <p><strong>Email:</strong> <span className="text-black">{profile?.email}</span></p>
         <p><strong>Creado el:</strong> <span className="text-black">{profile?.createdAt}</span></p>
         <p><strong>Última modificación:</strong> <span className="text-black">{profile?.updatedAt}</span></p>
   
      </div>
    </div>
  );
}
