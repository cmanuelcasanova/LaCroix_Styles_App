"use client"

import { GoAlertFill } from "react-icons/go";


type MoldeProps = {

onClose: () => void;
confirm: () => void;
}




export default function ConfirmationtModal( { onClose , confirm }: MoldeProps) {
  return (
    <div className="fixed inset-0 z-10 bg-black/40 blackdrop-blur-sm flex flex-col justify-center items-center w-dvw sm:w-full h-full sm:h-full">
         <div className="bg-white p-5 rounded-2xl shadow-lg flex flex-col justify-center items-center gap-2 w-[300px] h-[400px]">
          
          <GoAlertFill size={56} className="mx-auto text-yellow-300"/> 
          
            <h3 className="text-lg font-black text-gray-800"> Estas Segur@ de ELiminar?</h3>
            <p className="text-sm text-gray-500">
              Se Eliminará el Producto
            </p>
         
          <div className="flex gap-4">
            
            <button
              className= "btn btn-light text-white w-full rounded p-2 mt-4 bg-red-600"
              onClick={ ()=> {confirm(); onClose()} }  
            >
              Aceptar
            </button>

            <button
              className= "btn btn-light text-white w-full rounded p-2 mt-4 bg-blue-600"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>

        </div> 
  );
}
