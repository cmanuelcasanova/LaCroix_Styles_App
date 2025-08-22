'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4 bg-transparent">
      <h1 className="text-4xl font-bold mb-4">Código 404 - Página no encontrada</h1>
      <p className="text-lg mb-6">
        La ruta que escribiste no existe. ¿Quieres volver al inicio?
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-white w-[260px] rounded-md h-10 mx-auto text-black font-semibold active:scale-95
          transition-colors duration-300 ease-in-out hover:bg-[#677483]"
      >
        Regresar al Home
      </button>
    </div>
  );
}