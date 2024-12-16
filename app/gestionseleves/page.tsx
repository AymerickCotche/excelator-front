'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"
import Image from "next/image"
import AddCountry from "../components/AddCountry"
import { deleteEleve, Eleve, EleveForm, fetchAllEleve, setSelectedEleve, toggleOpenModal, toggleOpenModalEdit } from "@/redux/features/eleves/elevesSlice"
import AddEleve from "../components/AddEleve"
import EditEleve from "../components/EditEleve"
import Link from "next/link"

export default function Page() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getDatas = async () => {
      await dispatch(fetchAllEleve())
    }
    getDatas()
  }, [])
  
  const { eleves } = useAppSelector(state => state.eleves)
  const { data, form, total } = eleves
  const { openModal, openModalEdit } = form

  const handleClickAddCountry = () => {
    dispatch(toggleOpenModal(true))
  }

  const  numRoundMultiple = (x: number, y: number) => {
    return Math.round(x / y) * y;
  }

  const handleClickEditEleve = (eleve : Eleve) => {
    dispatch(toggleOpenModalEdit(true))
    dispatch(setSelectedEleve(eleve))
  }

  const handleClickDeleteEleve = (id: number) => {
    dispatch(deleteEleve({id}))
  }

  return (
    <div className="p-6">
      
      <div className="text-center">

        <h1 className=" text-2xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">
          Gestion Élèves
        </h1>
      </div>

        <div className="">

          <button onClick={handleClickAddCountry} className="px-2 py-1 border-2 rounded hover:bg-green-200 duration-200 mb-4">Ajouter Elève</button>


          <div className=" flex flex-col gap-4">
            <h2 className=" underline underline-offset-2 font-lg">Gestions élèves</h2>

            <div>
              <div className="grid grid-cols-9 bg-gray-200 p-9">
                <p>
                  Elève
                </p>
                <p>
                  Âge
                </p>
                <p>
                  Genre
                </p>
                <p>
                  Note
                </p>
                <p>
                  Paiement photo de classe
                </p>
                <p>
                  A-t-il payé ?
                </p>
                <p>
                  Mois paiement
                </p>
                <p>
                  Etat age
                </p>
                <p>
                  Actions
                </p>
                
              </div>
              {data.map(eleve => (
                <div key={eleve.id} className="grid grid-cols-9 even:bg-blue-200 odd:bg-pink-200 p-1">
                  <p>
                    {eleve.name}
                  </p>
                  <p>
                    {eleve.age}
                  </p>
                  <p className={eleve.sexe == 'Homme' ? 'text-red-400' : 'text-blue-400'}>
                    {eleve.sexe}
                  </p>
                  <p className={`bg-gradient-to-r from-cyan-500 to-white to-${numRoundMultiple(eleve.note*5, 10)}% text-center text-${eleve.note > 12 ? 'green-500' : eleve.note > 8 ? 'orange-500' : 'red-500'}`}>
                    {eleve.note}
                  </p>
                  <p className="text-center">
                    {eleve.value_paid}
                  </p>
                  <p>
                    {eleve.has_paid ? 'Payé' : 'Non payé'}
                  </p>
                  <p>
                    {eleve.paid_month}
                  </p>
                  <p>
                    {eleve.age > 17 ? 'Majeur' : 'Mineur'}
                  </p>
                  
                  <div className="flex gap-2 items-center">
                    <span onClick={() => handleClickDeleteEleve(eleve.id!)} className=" hover:cursor-pointer">
                      <Image
                        src={'/delete.png'}
                        width="20"
                        height="20"
                        alt="Icone de suppression"
                      />
                    </span>
                    <span onClick={() => handleClickEditEleve(eleve)} className=" hover:cursor-pointer">
                      <Image
                        src={'/edit.png'}
                        width="20"
                        height="20"
                        alt="Icone de modification"
                      />
                    </span>
                    
                  </div>
                  
                </div>
              ))}
            
            </div>
          </div>




      </div>

        {openModal && <AddEleve/>}
        {openModalEdit && <EditEleve/>}
    </div>
  );
}
