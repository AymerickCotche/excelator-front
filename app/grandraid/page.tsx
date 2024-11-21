'use client'

import { fetchAllCourses, fetchAllMeals, fetchAllRunners, fetchAllSizes, toggleAddRunner } from "@/redux/features/grandraid/grandraidSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AddRunner from "../components/AddRunner";
import { useEffect } from "react";

export default function Page() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getDatas = async () => {
      await dispatch(fetchAllCourses())
      await dispatch(fetchAllMeals())
      await dispatch(fetchAllRunners())
      await dispatch(fetchAllSizes())
    }
    getDatas()
  }, [])

  const { openModalAddRunner } = useAppSelector(state => state.grandraid)

  const handleClickAddRunner = () => {
    dispatch(toggleAddRunner(true))
  }

  return (
    <div>
        <h1>Grand Raid Manager</h1>

        <button onClick={handleClickAddRunner}>Ajouter coureur</button>

        <div>
          <h2>Liste des coureurs</h2>
          
        </div>

        {openModalAddRunner && <AddRunner/>}
    </div>
  );
}
