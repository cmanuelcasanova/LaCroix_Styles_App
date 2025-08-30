'use client';

import { useLogoutMutation } from '@/app/services/api/usersApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setUser } from "@/app/features/auth/authSlice";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";


export default function Logout() {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout().unwrap(); // 👈 importante para capturar errores
        dispatch( setUser ({ isAuthenticated: false, user: null, username: null})) ;
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
