'use client'

import { deleteRunner, fetchAllCourses, fetchAllMeals, fetchAllRunnerCategories, fetchAllRunners, fetchAllSizes, Runner, setRunnerForm, setSelectedRunner, toggleAddRunner, toggleEditRunner } from "@/redux/features/grandraid/grandraidSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AddRunner from "../components/AddRunner";
import { useEffect } from "react";
import Image from "next/image";
import EditRunner from "../components/EditRunnerForm";

export default function Page() {

  const dispatch = useAppDispatch()



  useEffect(() => {
    const getDatas = async () => {
      await dispatch(fetchAllCourses())
      await dispatch(fetchAllMeals())
      await dispatch(fetchAllRunners())
      await dispatch(fetchAllSizes())
      await dispatch(fetchAllRunnerCategories())
    }
    getDatas()
  }, [])
  
  const { openModalAddRunner, openModalEditRunner } = useAppSelector(state => state.grandraid)
  const { data: runnerDatas } = useAppSelector(state => state.grandraid.runners)
  const { data: sizeDatas } = useAppSelector(state => state.grandraid.sizes)
  const { data: mealDatas } = useAppSelector(state => state.grandraid.meals)
  const { data: courseDatas } = useAppSelector(state => state.grandraid.courses)
  const { data: runnerCategoryDatas } = useAppSelector(state => state.grandraid.runnerCategories)

  const getcategory = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const category = runnerCategoryDatas.find(runnerCategory => runnerCategory.start_year <= year && year >= runnerCategory.end_year)?.category
    return category
  }

  const getTotalPrice = (runner: Runner) => {
    const coursePrice = (courseDatas.find(course => course.id === Number(runner.course)))?.price
    const mealBeforePrice = runner.meal_before ? (mealDatas.find(meal => meal.type === 'before'))?.prix : 0
    const mealAfterPrice = runner.meal_after ? (mealDatas.find(meal => meal.type === 'after'))?.prix : 0
    const totalPrice = (coursePrice ?  coursePrice : 0) + (mealBeforePrice ? mealBeforePrice : 0) + (mealAfterPrice ? mealAfterPrice : 0)
    return totalPrice
  }
  
  const handleClickAddRunner = () => {
    dispatch(toggleAddRunner(true))
  }

  const handleClickEditRunner = (runner: Runner) => {
    dispatch(setSelectedRunner(runner))
    dispatch(toggleEditRunner(true))
  }

  const handleClickDeleteRunner = async (id:number|undefined) => {
    if (id) {
      await dispatch(deleteRunner({id}))
    }
  }

  return (
    <div className="p-6">
      <div className="text-center">

        <h1 className=" text-2xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">Grand Raid Manager</h1>
      </div>

        <button onClick={handleClickAddRunner} className="px-2 py-1 border-2 rounded hover:bg-green-200 duration-200 mb-4">Ajouter coureur</button>

        <div className=" flex flex-col gap-4">
          <h2 className=" underline underline-offset-2 font-lg">Liste des coureurs</h2>

          
          <div>
            <div className="grid grid-cols-10 bg-gray-200 p-1">
              <p>
                Nom
              </p>
              <p>
                Prénom
              </p>
              <p>
                Date de naissance
              </p>
              <p>
                Catégorie
              </p>
              <p>
                Course
              </p>
              <p>
                Taille tee-shirt
              </p>
              <p>
                Repas Avant
              </p>
              <p>
                Repas Après
              </p>
              <p>
                Total (€)
              </p>
              <p>
                Actions
              </p>
            </div>
            {runnerDatas.map(runnerData => (
              <div key={runnerData.id} className="grid grid-cols-10 even:bg-blue-200 odd:bg-pink-200 p-1">
                <p>
                  {runnerData.lastname}
                </p>
                <p>
                  {runnerData.firstname}
                </p>
                <p>
                  {runnerData.birth_date}
                </p>
                <p>
                  {getcategory(runnerData.birth_date)}
                </p>
                <p>
                  {courseDatas.find(course => course.id === runnerData.course)?.name}
                </p>
                <p>
                  {sizeDatas.find(size => size.id === runnerData.shirt_size)?.symbol}
                </p>
                <p>
                  {runnerData.meal_before ? "OUI" : "NON"}
                </p>
                <p>
                  {runnerData.meal_after ? "OUI" : "NON"}
                </p>
                <p className=" font-semibold">
                  {getTotalPrice(runnerData)}
                </p>
                <div className="flex gap-2 items-center">
                  <span onClick={() => handleClickDeleteRunner(runnerData.id)} className=" hover:cursor-pointer">
                    <Image
                      src={'/delete.png'}
                      width="20"
                      height="20"
                      alt="Icone de suppression"
                    />
                  </span>
                  <span onClick={() => handleClickEditRunner(runnerData)} className=" hover:cursor-pointer">
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

        {openModalAddRunner && <AddRunner/>}
        {openModalEditRunner && <EditRunner/>}
    </div>
  );
}
