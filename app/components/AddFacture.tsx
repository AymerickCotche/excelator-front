import { addFacture, toggleOpenModal, setFactureFormGrossiste, setFactureFormMarchandiseHT, setFactureFormPaiementComptant,setFactureFormVenteEmportee } from '@/redux/features/facturation/facturationSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'

function AddFacture() {

    const dispatch = useAppDispatch()

    const { form } = useAppSelector(state=> state.facturation)
    const { grossiste, vente_emportee, paiement_comptant, marchandise_ht } = form

    const handleClickCloseModal = () => {
      dispatch(toggleOpenModal(false))
    }

    const handleChangeMarchandiseHT = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
    
      dispatch(setFactureFormMarchandiseHT(value));
    }

    const handleChangeGrossiste = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target
      
      dispatch(setFactureFormGrossiste(checked));
    }

    const handleChangePaiementComptant = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target
    
      dispatch(setFactureFormPaiementComptant(checked));
    }

    const handleChangeVenteEmportee = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target
    
      dispatch(setFactureFormVenteEmportee(checked));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(addFacture({marchandise_ht, grossiste, vente_emportee, paiement_comptant}))
      dispatch(toggleOpenModal(false))
    }

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-zinc-600  p-4'>

            <button onClick={handleClickCloseModal} className="border border-white text-white px-3 py-2 rounded mb-2">
                Fermer
            </button>
            <p className='text-white'>Enregistrer une facture</p>
            <form onSubmit={handleSubmit} className="">
              <div className='flex gap-2 flex-col'>
                <div>
                  <label htmlFor="marchandise_ht" className="block font-medium mb-2 text-white">
                    Marchandise HT
                  </label>
                  <input
                      type="number"
                      id="marchandise_ht"
                      name="marchandise_ht"
                      value={marchandise_ht}
                      onChange={handleChangeMarchandiseHT}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>
                <div className='flex gap-2'>
                  <label htmlFor="grossiste" className="block font-medium mb-2 text-white">
                      Grossiste ?
                  </label>
                  <div>
                    <input
                        type="checkbox"
                        id="grossiste"
                        name="grossiste"
                        onChange={handleChangeGrossiste}
                        className="border p-2 mb-4 w-full text-black"
                    />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <label htmlFor="paiement_comptant" className="block font-medium mb-2 text-white">
                      Paiement comptant ?
                  </label>
                  <div>
                    <input
                        type="checkbox"
                        id="paiement_comptant"
                        name="paiement_comptant"
                        onChange={handleChangePaiementComptant}
                        className="border p-2 mb-4 w-full text-black"
                    />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <label htmlFor="vente_emportee" className="block font-medium mb-2 text-white">
                      Vente emportée ?
                  </label>
                  <div>
                    <input
                        type="checkbox"
                        id="vente_emportee"
                        name="vente_emportee"
                        onChange={handleChangeVenteEmportee}
                        className="border p-2 mb-4 w-full text-black"
                    />
                  </div>
                </div>

              </div>

                <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                    Enregistrer la facture
                </button>
            </form>
        </div>
    )
}

export default AddFacture