"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useLoginMutation } from "@/app/services/api/usersApi";
import { useLazyGetAllItemsCarQuery } from "@/app/services/api/ShoppingApi";
import { setUser } from "@/app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addItem } from "@/app/features/Car/CarSlice";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { useSelector } from "react-redux";
import { useCreateItemCarMutation } from "@/app/services/api/ShoppingApi"
import { useState } from "react";
import { truncate } from "node:fs/promises";



type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false)
  const [play_LazyGetItemsCar, { data: itemsCarBD }] = useLazyGetAllItemsCarQuery();
  const router = useRouter();
  const [Login] = useLoginMutation();
  const itemsCarrito = useSelector(selectItemsc);
  const [addItemBD] = useCreateItemCarMutation ();
  const [mergeRTK,setMergeRTK] = useState<boolean>(false);
  const [mergeDB,setMergeDB] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    
    setLoading(true)
    try {
      const response = await Login(data).unwrap();
   
      dispatch(
        setUser({
          isAuthenticated: true,
          user: response.user,
          username: response.username,
          role: response.role,
        })
      );

      if(response.username) {await play_LazyGetItemsCar();}


      router.push("/");
    } catch (error) {
      console.error("Error en el Login:", error);
      alert("Error al Loguearse, Reintente");
    }
  });

  useEffect(() => {
    if (itemsCarBD && !mergeRTK) {
    
  
      if (itemsCarBD.length>0) {

        
          
         itemsCarBD.forEach(element => {

          dispatch(
                  addItem({
                    id: element.productId+element.Talla.name,
                    idProduct: element.productId,
                    cant: element.cantidad,
                    precio: element.precio,
                    imgUrl: element.Product.product_images[0].imageurl,
                    title: element.title,
                    talla: element.Talla.name,
                    mode: 'sync'
                  })
                );

        });

        setMergeRTK(true)
      }
    }

    if(itemsCarrito.length>0 && !mergeDB) {

      itemsCarrito.forEach(element => {

        
          try {
          
            addItemBD({
            title: element.title,
            talla: element.talla,
            cantidad: element.cant,
            precio: element.precio,
            productId: element.idProduct,
            mode:'sync'
          }).unwrap();
        }catch(error){console.log(error)}
      



      } )


       setMergeDB(true)

    }

     setLoading(false)
   


  }, [itemsCarBD, dispatch,itemsCarrito,addItemBD, mergeRTK, mergeDB ]);


  return (
    <div className="flex justify-center items-center min-h-screen mx-4 mt-10 ">
      <div className="h-140 w-100 border bg-white border-[#202b38] p-2 rounded-3xl hover:border-[#677483] transition-colors duration-800">
        <h1 className="  text-4xl pl-4 mt-12">Sing in</h1>

        <div className="text-[#8092a1] flex flex-col p-4 pt-10">
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items center"
          >
            <label className="flex flex-col mb-4">
              Email
              <input
                className=" h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#ff288b] focus:shadow-[0_0_0_4px_#ffd5e1]
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
                className="h-10 border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#ff288b] focus:shadow-[0_0_0_4px_#ffd5e1]
                hover:border-[#677483] transition-colors duration-200"
                type="password"
                placeholder="Input Password"
                required
                {...register("password")}
              />
            </label>

            <div className="flex flex-col w-full content-center justify-center items-center rounded-md h-[70px] mt-10 ">
              <button
                type="submit"
                className=" w-30 bg-[#ff288b] my-4 mx-auto h-full rounded-md text-black font-semibold active:scale-95
             transition-colors duration-300 ease-in-out hover:bg-[#fad6e0] "
              >
                Login
              </button>
            </div>

            <label className="mt-20 ">
              <h1 className="mt-20 flex flex-warp gap-2 text-sm ">
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
