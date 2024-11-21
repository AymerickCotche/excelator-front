import { GrandraidState, insertRunner, resetRunnerForm, setRunnerForm, setRunnerformTotal, toggleAddRunner } from '@/redux/features/grandraid/grandraidSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function AddRunner() {

    const dispatch = useAppDispatch()

    const { test } = useAppSelector(state => state.grandraid)
    const { runnerForm } = useAppSelector(state => state.grandraid)
    const { firstname, lastname, birthday, mealbefore, mealafter, sexe, course, category, shirtSize, total } = useAppSelector(state => state.grandraid.runnerForm)
    const { courses } = useAppSelector(state => state.grandraid)
    const { meals } = useAppSelector(state => state.grandraid)
    const { runners } = useAppSelector(state => state.grandraid)
    const { sizes } = useAppSelector(state => state.grandraid)

    useEffect(() => {
      const getTotal = () => {
        const total = (courses.data.find(course => course.name === runnerForm.course))?.price
        dispatch(setRunnerformTotal(total))
      }
      getTotal()
    }, [runnerForm.course])

    const handleClickCloseModal = () => {
      dispatch(resetRunnerForm())
      dispatch(toggleAddRunner(false))
    }

    const handleChangeValue = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
    
      // Vérifie si c'est une checkbox pour utiliser `checked` au lieu de `value`
      const parsedValue =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : value;
    
      dispatch(setRunnerForm({ field: name as keyof typeof runnerForm, value: parsedValue }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const newRunner = {
        firstname: firstname,
          lastname : lastname,
          sexe: sexe,
          birth_date: birthday,
          shirt_size: 1,
          course: 3,
          meal_before: mealbefore,
          meal_after: mealafter,
      }
      await dispatch(insertRunner({
        data :newRunner
      }))
    }

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-zinc-600  p-4'>

            <button onClick={handleClickCloseModal} className="border border-white text-white px-3 py-2 rounded mb-2">
                Fermer
            </button>

            <form onSubmit={handleSubmit} className="">
              <div className='flex gap-2'>
                <div>
                  <label htmlFor="lastname" className="block font-medium mb-2 text-white">
                      Nom
                  </label>
                  <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={lastname}
                      onChange={handleChangeValue}
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

                <div>
                  <label htmlFor="firstname" className="block font-medium mb-2 text-white">
                      Prénom
                  </label>
                  <input
                      type="text"
                      id="lastname"
                      name="firstname"
                      value={firstname}
                      onChange={handleChangeValue}
                      className="border p-2 mb-4 w-full text-black"
                  />
                  
                </div>
              </div>

              <div className='flex gap-2'>
                <div>

                  <label htmlFor="sexe" className="block font-medium mb-2 text-white">
                      Sexe
                  </label>
                  <select
                      id="sexe"
                      name="sexe"
                      value={sexe}
                      onChange={handleChangeValue}
                      className="border p-2 mb-4 w-full text-black"
                      
                  >
                      <option value='H'>
                          Homme
                      </option>
                      <option value='F'>
                          Femme
                      </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="birthday" className="block font-medium mb-2 text-white">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={birthday}
                    onChange={handleChangeValue}
                    className="border p-2 mb-4 w-full text-black"
                  />
                </div>
              </div>

                <label htmlFor="shirtSize" className="block font-medium mb-2 text-white">
                  Taille du teeshirt
                </label>
                <select
                  id="shirtSize"
                  name="shirtSize"
                  value={shirtSize}
                  onChange={handleChangeValue}
                  className="border p-2 mb-4 w-full text-black"
                    
                >
                  {sizes.data.map(size => (
                    <option key={size.id}>
                      {size.symbol}
                    </option>
                  ))}
                </select>
                <div className='flex gap-2'>

                {
                  meals.data.map(meal => (
                    <div key={meal.id} className='flex gap-1'>
                      <label htmlFor={`meal${meal.type}`} className="block font-medium mb-2 text-white">
                        {meal.name} ({meal.prix}€)
                      </label>
                      <div>
                        <input
                          type="checkbox"
                          id={`meal${meal.type}`}
                          name={`meal${meal.type}`}
                          value={birthday}
                          onChange={handleChangeValue}
                          className="border p-2 mb-4 w-full text-black"
                        />
                      </div>
                    </div>
                  ))
                }
                </div>

                <label htmlFor='course' className="block font-medium mb-2 text-white">
                  Course
                </label>
                <select
                    id="course"
                    name="course"
                    value={course}
                    onChange={handleChangeValue}
                    className="border p-2 mb-4 w-full text-black"                  
                >
                  {courses.data.map(course => (
                    <option key={course.id} value={course.name}>
                      {course.name} - {course.price}€
                    </option>
                  ))}
                </select>

                <p>
                  {total}
                </p>

                <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                    Enregistrer le coureur
                </button>
            </form>
        </div>
    )
}

export default AddRunner