
import { BsDatabaseExclamation } from "react-icons/bs";


export default function ErrorConection() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center w-dvw sm:w-[700px] h-[800px] ">
        <BsDatabaseExclamation size={100} className="my-10"/>
        <h1> Error Conection a BD </h1>
      </div>
    </div>
  );
}
