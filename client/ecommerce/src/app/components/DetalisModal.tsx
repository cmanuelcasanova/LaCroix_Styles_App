
"use client"

import { FaCheckCircle } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";

type MoldeProps = {

onClose: () => void;
tipo: boolean;


}


export default function AlertModal( { onClose , tipo }: MoldeProps) {
  return (
    <div className="fixed inset-0 z-10 bg-black/40 blackdrop-blur-sm flex flex-col justify-center items-center w-dvw sm:w-full h-full sm:h-full">
         <div className="bg-white p-5 rounded-2xl shadow-lg flex flex-col justify-center items-center gap-2 w-[300px] h-[400px]">
          
          { tipo ?  <FaCheckCircle size={56} className="mx-auto text-green-400"/> : <MdDangerous size={56} className="mx-auto text-red-600"/> }
          
            <h3 className="text-lg font-black text-gray-800">{ tipo ? "Success" : "Error" }</h3>
            <p className="text-sm text-gray-500">
              
            </p>
         
          <div className="flex gap-4">
            
            <button
              className= {`btn btn-light w-full rounded p-2 mt-4 ${tipo ? "bg-green-400" : "bg-red-600"}`}
              onClick={onClose}
            >
              Aceptar
            </button>
          </div>
        </div>

        </div> 
  );
}