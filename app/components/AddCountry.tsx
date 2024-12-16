import { addCountry, setCountryFormName, setCountryFormRevenue, resetCountryForm, toggleOpenModal } from '@/redux/features/referenceabsolue/referenceabsolueSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function AddCountry() {

    const dispatch = useAppDispatch()

    const { form } = useAppSelector(state=> state.referenceabsolue.country)
    const { name, revenue} = form

    const handleClickCloseModal = () => {
      dispatch(toggleOpenModal(false))
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
    
      dispatch(setCountryFormName(value));
    }

    const handleChangeRevenue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
    
      dispatch(setCountryFormRevenue(value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(addCountry({name, revenue}))
      dispatch(toggleOpenModal(false))
    }

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-zinc-600  p-4'>

            <button onClick={handleClickCloseModal} className="border border-white text-white px-3 py-2 rounded mb-2">
                Fermer
            </button>
            <p className='text-white'>Enregistrer un nouveau pays</p>
            <form onSubmit={handleSubmit} className="">
              <div className='flex gap-2'>
                <div>
                  <label htmlFor="name" className="block font-medium mb-2 text-white">
                      Nom
                  </label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChangeName}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block font-medium mb-2 text-white">
                      Chiffre d'affaire
                  </label>
                  <input
                      type="text"
                      id="price"
                      name="price"
                      value={revenue}
                      onChange={handleChangeRevenue}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

              </div>

                <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                    Enregistrer le pays
                </button>
            </form>
        </div>
    )
}

export default AddCountry