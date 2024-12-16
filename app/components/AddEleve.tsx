import { addEleve, setEleveFormAge, setEleveFormHasPaid, setEleveFormPaidMonth, setEleveFormPaidValue, setEleveFormName, toggleOpenModal, setEleveFormNote, setEleveFormSexe, setSelectedEleve } from '@/redux/features/eleves/elevesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function AddEleve() {

    const dispatch = useAppDispatch()

    const { form } = useAppSelector(state=> state.eleves.eleves)
    const { name, age, has_paid, note, sexe, value_paid, paid_month } = form

    const handleClickCloseModal = () => {
      dispatch(toggleOpenModal(false))
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
    
      dispatch(setEleveFormName(value));
    }

    const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
    
      dispatch(setEleveFormAge(value));
    }

    const handleChangeSexe = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target
    
      dispatch(setEleveFormSexe(value));
    }

    const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
    
      dispatch(setEleveFormNote(value));
    }

    const handleChangePaiementValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
    
      dispatch(setEleveFormPaidValue(value));
    }

    const handleChangeHasPaid = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setEleveFormHasPaid(!has_paid));
    }

    const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target
    
      dispatch(setEleveFormPaidMonth(value));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(addEleve({name, age: Number(age), has_paid, value_paid: Number(value_paid), paid_month, note: Number(note), sexe}))
      dispatch(toggleOpenModal(false))
    }

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-zinc-600  p-4'>

            <button onClick={handleClickCloseModal} className="border border-white text-white px-3 py-2 rounded mb-2">
                Fermer
            </button>
            <p className='text-white'>Enregistrer un nouvel élève</p>
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
                  <label htmlFor="age" className="block font-medium mb-2 text-white">
                      Âge
                  </label>
                  <input
                      type="number"
                      id="age"
                      name="age"
                      value={age}
                      onChange={handleChangeAge}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

              </div>

              <div className='flex gap-2'>
                <div>
                  <label htmlFor="sexe" className="block font-medium mb-2 text-white">
                      Genre
                  </label>
                  <select
                      id="sexe"
                      name="sexe"
                      value={sexe}
                      onChange={handleChangeSexe}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  >
                    <option value='Femme'>
                      Femme
                    </option>
                    <option value='Homme'>
                      Homme
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="note" className="block font-medium mb-2 text-white">
                      Note
                  </label>
                  <input
                      type="number"
                      id="note"
                      name="note"
                      value={note}
                      onChange={handleChangeNote}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

              </div>

              <div className='flex gap-2'>
                <div>
                  <label htmlFor="sexe" className="block font-medium mb-2 text-white">
                      Montant paiement
                  </label>
                  <input
                      type="number"
                      id="sexe"
                      name="sexe"
                      value={value_paid}
                      onChange={handleChangePaiementValue}
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>
                <div>
                  <label htmlFor="has_paid" className="block font-medium mb-2 text-white">
                      A payé ?
                  </label>
                  <input
                      type="checkbox"
                      id="has_paid"
                      name="has_paid"
                      checked={has_paid}
                      onChange={handleChangeHasPaid}
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

              </div>

              <div>
                  <label htmlFor="month" className="block font-medium mb-2 text-white">
                      Mois de paiement
                  </label>
                  <select
                      id="month"
                      name="month"
                      value={paid_month}
                      onChange={handleChangeMonth}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  >
                    <option value='Janvier'>
                      Janvier
                    </option>
                    <option value='Février'>
                      Février
                    </option>
                    <option value='Mars'>
                      Mars
                    </option>
                    <option value='Avril'>
                      Avril
                    </option>
                    <option value='Mai'>
                      Mai
                    </option>
                    <option value='Juin'>
                      Juin
                    </option>
                    <option value='Juillet'>
                      Juillet
                    </option>
                    <option value='Aout'>
                      Aout
                    </option>
                    <option value='Septembre'>
                      Septembre
                    </option>
                    <option value='Octobre'>
                      Octobre
                    </option>
                    <option value='Novembre'>
                      Novembre
                    </option>
                    <option value='Décembre'>
                      Décembre
                    </option>
                  </select>
                </div>

              <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                  Enregistrer l&apos;élève
              </button>
            </form>
        </div>
    )
}

export default AddEleve