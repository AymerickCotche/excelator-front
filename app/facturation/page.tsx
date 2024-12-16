'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"
import Image from "next/image"
import { deleteFacture, fetchAllFacture, toggleOpenModal, setSelectedInvoice, Facture } from "@/redux/features/facturation/facturationSlice"
import AddFacture from "../components/AddFacture"

export default function Page() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getDatas = async () => {
      await dispatch(fetchAllFacture())
    }
    getDatas()
  }, [])
  
  const { data, form, selectedInvoice } = useAppSelector(state => state.facturation)
  const { openModal } = form

  const handleClickAddFacture = () => {
    dispatch(toggleOpenModal(true))
  }

  // const  numRoundMultiple = (x: number, y: number) => {
  //   return Math.round(x / y) * y;
  // }

  // const handleClickEditEleve = (eleve : Eleve) => {
  //   dispatch(toggleOpenModalEdit(true))
  //   dispatch(setSelectedEleve(eleve))
  // }

  const handleClickDeleteEleve = (id: number) => {
    dispatch(deleteFacture({id}))
  }

  const handleClickInvoice = (invoice: Facture) => {
    dispatch(setSelectedInvoice(invoice))
  }

  return (
    <div className="p-6">
      
      <div className="text-center mb-4">

        <h1 className=" text-2xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">
          Facturation
        </h1>
      </div>

      <div className="flex gap-4">

        <div className="flex-1 flex flex-col gap-4">
          <button onClick={handleClickAddFacture} className="px-2 py-1 border-2 rounded hover:bg-green-200 duration-200">Ajouter Facture</button>
          <h2 className=" underline underline-offset-2 font-lg">Liste des factures</h2>

          <div>
            <div className="grid grid-cols-2 bg-gray-200 p-9">
              <p>
                num_facture
              </p>
              <p>
                Actions
              </p>
              
            </div>
            {data.map(facture => (
              <div key={facture.id} className="grid grid-cols-2 even:bg-blue-200 odd:bg-pink-200 p-1 hover:cursor-pointer hover:font-bold" onClick={() => handleClickInvoice(facture)}>
                <p>
                  {facture.num_facture}
                </p>
                
                <div className="flex gap-2 items-center">
                  <span onClick={() => handleClickDeleteEleve(facture.id!)} className=" hover:cursor-pointer">
                    <Image
                      src={'/delete.png'}
                      width="20"
                      height="20"
                      alt="Icone de suppression"
                    />
                  </span>
                  <span onClick={() => console.log('yo')} className=" hover:cursor-pointer">
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
        
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-center text-lg">Visualiser facture</h2>
          {selectedInvoice ?
          <div>
            <p>Numéro de facture : {selectedInvoice.num_facture}</p>
            <p>Grossiste ? : {selectedInvoice.grossiste ? 'Oui' : 'Non'}</p>
            <p>Paiement Comptant ? : {selectedInvoice.paiement_comptant ? 'Oui' : 'Non'}</p>
            <p>Marchandise emportée ? : {selectedInvoice.vente_emportee ? 'Oui' : 'Non'}</p>
            <p>Montant marchandise HT : {selectedInvoice.marchandise_ht} €</p>
            <p>Remise 1 : {selectedInvoice.remise_1} €</p>
            <p>Sous-total 1 : {selectedInvoice.sous_total_1} €</p>
            <p>Remise 2 : {selectedInvoice.remise_2} €</p>
            <p>Sous-total 2 : {selectedInvoice.sous_total_2} €</p>
            <p>Escompte : {selectedInvoice.escompte} €</p>
            <p>Total HT : {selectedInvoice.total_ht} €</p>
            <p>TVA : {selectedInvoice.tva} €</p>
            <p>Total TTC : {selectedInvoice.total_ttc} €</p>
            <p>Frais de port : {selectedInvoice.frais_de_port} €</p>
            <p>Total à payer : {selectedInvoice.total_a_payer} €</p>

          </div> :
            <p>Sélectionner une facture pour afficher les détails</p>
          }
        </div>

      </div>
        {openModal && <AddFacture/>}
      {/* {openModalEdit && <EditEleve/>} */}
    </div>
  );
}
