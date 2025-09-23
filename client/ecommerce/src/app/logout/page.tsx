'use client';

import { useLogoutMutation } from '@/app/services/api/usersApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout as logout_Auth} from "@/app/features/auth/authSlice";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { baseApi  } from "@/app/services/api/baseApi"
import { clearItems } from "@/app/features/Car/CarSlice";


export default function Logout() {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        
        await logout().unwrap(); // 👈 importante para capturar errores
        dispatch(  logout_Auth()) ;
        localStorage.removeItem('token');
        dispatch(baseApi.util.resetApiState());
        dispatch(clearItems())
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      } finally {
        router.push('/');
      }
    };

    handleLogout();
  }, [logout, router, dispatch]);

  return null; // No necesitas renderizar nada
}
