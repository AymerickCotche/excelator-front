import { editRunner, GrandraidState, insertRunner, resetRunnerForm, setEditRunnerForm, setRunnerEditFormTotal, setRunnerForm, setRunnerformTotal, toggleEditRunner } from '@/redux/features/grandraid/grandraidSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function EditRunnerForm() {

    const dispatch = useAppDispatch()

    const { selectedRunner } = useAppSelector(state => state.grandraid.runners)
    const { firstname, lastname, birth_date, meal_before, meal_after, sexe, course, shirt_size, total } = useAppSelector(state => state.grandraid.runners.selectedRunner)
    const { courses } = useAppSelector(state => state.grandraid)
    const { meals } = useAppSelector(state => state.grandraid)
    const { runners } = useAppSelector(state => state.grandraid)
    const { sizes } = useAppSelector(state => state.grandraid)

    useEffect(() => {
      const getTotal = () => {
        const coursePrice = (courses.data.find(course => course.id === Number(selectedRunner.course)))?.price
        const mealBeforePrice = meal_before ? (meals.data.find(meal => meal.type === 'before'))?.prix : 0
        const mealAfterPrice = meal_after ? (meals.data.find(meal => meal.type === 'after'))?.prix : 0
        const totalPrice = (coursePrice ?  coursePrice : 0) + (mealBeforePrice ? mealBeforePrice : 0) + (mealAfterPrice ? mealAfterPrice : 0)
        dispatch(setRunnerEditFormTotal(totalPrice))
      }
      getTotal()
    }, [selectedRunner.course, selectedRunner.meal_before, selectedRunner.meal_after])

    const handleClickCloseModal = () => {
      dispatch(resetRunnerForm())
      dispatch(toggleEditRunner(false))
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
    
      dispatch(setEditRunnerForm({ field: name as keyof typeof selectedRunner, value: parsedValue }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      await dispatch(editRunner({editedRunner: selectedRunner}))
      dispatch(toggleEditRunner(false))
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
                      required
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
                      required
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
                      required
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
                  <label htmlFor="birth_date" className="block font-medium mb-2 text-white">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    value={birth_date}
                    onChange={handleChangeValue}
                    required
                    className="border p-2 mb-4 w-full text-black"
                  />
                </div>
              </div>

                <label htmlFor="shirt_size" className="block font-medium mb-2 text-white">
                  Taille du teeshirt
                </label>
                <select
                  id="shirt_size"
                  name="shirt_size"
                  value={shirt_size}
                  onChange={handleChangeValue}
                  required
                  className="border p-2 mb-4 w-full text-black"
                    
                >
                  {sizes.data.map(size => (
                    <option key={size.id} value={size.id}>
                      {size.symbol}
                    </option>
                  ))}
                </select>
                <div className='flex gap-2'>

                {
                  meals.data.map(meal => (
                    <div key={meal.id} className='flex gap-1'>
                      <label htmlFor={`meal_${meal.type}`} className="block font-medium mb-2 text-white">
                        {meal.name} ({meal.prix}€)
                      </label>
                      <div>
                        <input
                          type="checkbox"
                          id={`meal_${meal.type}`}
                          name={`meal_${meal.type}`}
                          value={`meal_${meal.type}`}
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
                    required
                    className="border p-2 mb-4 w-full text-black"                  
                >
                  {courses.data.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name} - {course.price}€
                    </option>
                  ))}
                </select>

                <div className='text-white border border-emerald-300 mb-2'>
                  <p className='text-center'>Total estimé</p>
                  <p className='text-center'>{total} €</p>
                </div>

                <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                    Enregistrer le coureur
                </button>
            </form>
        </div>
    )
}

export default EditRunnerForm