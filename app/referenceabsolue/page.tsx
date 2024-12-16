'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"
import { Chart } from "react-google-charts"
import Image from "next/image"
import AddCountry from "../components/AddCountry"
import { deleteCountry, fetchAllCountry, setTotal, toggleOpenModal } from "@/redux/features/referenceabsolue/referenceabsolueSlice"

export default function Page() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getDatas = async () => {
      await dispatch(fetchAllCountry())
    }
    getDatas()
  }, [])
  
  const { country } = useAppSelector(state => state.referenceabsolue)
  const { data, form, total } = country
  const { openModal } = form

  const handleClickAddCountry = () => {
    dispatch(toggleOpenModal(true))
  }

  const calculateTotal = () => {
    const total = data.reduce((accumulator, currentValue) => accumulator + Number(currentValue.revenue), 0)
    return Number(total)
  }

  const getPourcentage = (revenue: number, total:number) => {
    const pourcentage =  revenue / total * 100
    return pourcentage.toFixed(2)
  }

  const formatData = () => {
    const formattedData = data.map(country => [country.name, Number(country.revenue)])
    formattedData.unshift(['test', 'test2'])
    console.log(formattedData);
    return formattedData
  }

  const handleClickDeleteCountry = (id: number) => {
    dispatch(deleteCountry({id}))
  }

  useEffect(() => {
    dispatch(setTotal(calculateTotal()))
  }, [data])

  return (
    <div className="p-6">
      <div className="text-center">

        <h1 className=" text-2xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">
          Référence absolue
        </h1>
      </div>
      <div className=" flex">
        <div className="flex-1">

          <button onClick={handleClickAddCountry} className="px-2 py-1 border-2 rounded hover:bg-green-200 duration-200 mb-4">Ajouter Pays</button>


          <div className=" flex flex-col gap-4">
            <h2 className=" underline underline-offset-2 font-lg">Chiffres d'affaire par pays</h2>

            <div>
              <div className="grid grid-cols-4 bg-gray-200 p-1">
                <p>
                  Pays
                </p>
                <p>
                  Chiffre d'affaire (€)
                </p>
                <p>
                  Part de marché
                </p>
                <p>
                  Actions
                </p>
                
              </div>
              {data.map(country => (
                <div key={country.id} className="grid grid-cols-4 even:bg-blue-200 odd:bg-pink-200 p-1">
                  <p>
                    {country.name}
                  </p>
                  <p>
                    {country.revenue}
                  </p>
                  <p>
                    {getPourcentage(Number(country.revenue), total)}%
                  </p>
                  <div className="flex gap-2 items-center">
                    <span onClick={() => handleClickDeleteCountry(country.id!)} className=" hover:cursor-pointer">
                      <Image
                        src={'/delete.png'}
                        width="20"
                        height="20"
                        alt="Icone de suppression"
                      />
                    </span>
                    <span onClick={() => handleClickDeleteCountry(country.id!)} className=" hover:cursor-pointer">
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
              <div className="grid grid-cols-4 bg-gray-200 p-1">
                <p>
                  TOTAL
                </p>
                <p>
                  {total}
                </p>
                <p>
                  100%
                </p>
                <p>
                  --
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
        <Chart
          chartType="PieChart"
          data={formatData()}
          options={{
            title: "Part de marché",
          }}
          width={"100%"}
          height={"400px"}
        />
        </div>

      </div>

        {openModal && <AddCountry/>}
    </div>
  );
}
