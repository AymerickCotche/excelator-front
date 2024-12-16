'use client'

import Link from "next/link";
import { useCookies } from 'next-client-cookies'
import Login from "./components/Login";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Register from "./components/Register";
import { resetAuthForm, setIsRegister } from "@/redux/features/auth/authSlice";

export default function Home() {

  const cookies = useCookies()
  const dispatch = useAppDispatch()

  const { isRegister, message } = useAppSelector(state => state.auth)

  const handleClickToggleRegister = () => {
    dispatch(resetAuthForm())
    dispatch(setIsRegister(!isRegister))
  }
  const token = cookies.get('excelator-token')


  if (!token) return (
    <div className="bg-red-200 h-full flex flex-col gap-4 items-center justify-center">
      <h1 className=" text-5xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">EXCELATOR</h1>
      {message !== "" ? message : ""}
      {isRegister ? <Register/>
                  : <Login/>
      }
      <p className=" hover:cursor-pointer hover:font-bold duration-200" onClick={handleClickToggleRegister}>
        {
        isRegister  ? <span>Déjà un compte ?</span>
                    : <span>Pas encore enregistré ? Créer un compte</span> 
        }
      </p>              
    </div>
  )

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-200">
      <h1 className=" text-5xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">EXCELATOR</h1>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" grid grid-cols-3 gap-4">
          <div className=" border border-black rounded p-2 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-pink-200  duration-200">
            <Link href='/grandraid'>
            App Grand Raid
            </Link>
          </div>
          <div className=" border border-black rounded p-2 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-pink-200  duration-200 text-center">
            <Link href='/calculssimples'>
              Calculs Simples
            </Link>
          </div>
          <div className=" border border-black rounded p-2 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-pink-200 duration-200 text-center">
            <Link href='/referenceabsolue'>
              Référence absolue
            </Link>
          </div>
          <div className=" border border-black rounded p-2 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-pink-200 duration-200 text-center">
            <Link href='/gestionseleves'>
              Gestion élèves
            </Link>
          </div>
          <div className=" border border-black rounded p-2 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-pink-200 duration-200 text-center">
            <Link href='/facturation'>
              Facturation
            </Link>
          </div>
          <div className=" border border-black rounded p-2 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-pink-200 duration-200 text-center">
            App XXX
          </div>


        </div>
      </main>
    </div>
  );
}
