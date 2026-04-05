"use client";

import { useRouter } from "next/navigation";
import { useProfileQuery } from "@/app/services/api/usersApi";
import LoadingModal from "@/app/components/Loadingpage";
import { TbArrowBackUp } from "react-icons/tb";
import { useEffect, useState, useRef } from "react";
import { useResend_emailMutation } from "@/app/services/api/usersApi";
import Countdown from "react-countdown";

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfileQuery();
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [viewVerify, setviewVerify] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const [resend_email] = useResend_emailMutation();
  const router = useRouter();
  const isSubmitting = useRef(false); 

  useEffect(() => {
    if (profile?.isVerified) setIsVerify(true);
  }, [profile]);

  const HandleResend = async () => {
    if (isSubmitting.current) return;

    isSubmitting.current=true;

    if (profile) {
      const response = await resend_email({ email: profile.email }).unwrap();
      setSend(true);
      isSubmitting.current =false

    }
  };

  if (isLoading) return <LoadingModal />;
  if (!profile) {
    router.push("/login");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-4 mt-20 sm:mt-6 ">
      <div className="flex flex-col items-start justify-start h-120 sm:w-100 w-80 mx-4 border bg-white border-[#202b38] p-4 sm:p-6 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        <h1 className="  text-4xl mx-auto mt-12 mb-8">Perfil de Usuario</h1>

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
          <span className="text-black">
            {profile?.email}{" "}
            <span onClick={() => setviewVerify(!viewVerify)}>
              {" "}
              {profile?.isVerified ? "✅​" : "⚠️​"}{" "}
            </span>
          </span>
        </p>

        {viewVerify && (
          <div className="h-12 w-full my-2">
            {!isVerify ? (
              !send ? (
                <button
                  className="bg-amber-200 px-4 h-10  mx-auto shadow rounded-2xl flex flex-wrap items-center gap-2 hover:bg-gray-200 active:scale-95 transition-transform duration-150 ease-in-out
              "
                  disabled={send}
                  onClick={() => HandleResend()}
                >
                  Reenviar correo verifificación
                </button>
              ) : (
                <button
                  className="text-white bg-gray-500 px-4 h-10  mx-auto shadow rounded-2xl flex flex-wrap items-center gap-2 hover:bg-gray-200
              "
                  disabled
                  onClick={() => HandleResend()}
                >
                  Reintentar en:
                  <Countdown
                    date={Date.now() + 180000}
                    renderer={({ minutes, seconds, completed }) => {
                      if (completed) {
                        setSend(false);
                      }
                      return (
                        <span>
                          {minutes}:{seconds}
                        </span>
                      );
                    }}
                  />
                </button>
              )
            ) : (
              <button className="bg-green-300 h-10 px-4 mx-auto shadow rounded-2xl flex flex-wrap items-center gap-2 hover:bg-gray-200 active:scale-95 transition-transform duration-150 ease-in-out">
                "Correo Verificado"
              </button>
            )}
          </div>
        )}

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
