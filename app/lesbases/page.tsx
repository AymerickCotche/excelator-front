'use client'

import { fetchAllProduct, setActionType, setSelectedProduct, toggleOpenModal, toggleOpenModalProduct } from "@/redux/features/lesbases/lesbasesSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"
import Image from "next/image"
import StockAction from "../components/StockAction"
import AddProduct from "../components/AddProduct"

export default function Page() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getDatas = async () => {
      await dispatch(fetchAllProduct())
    }
    getDatas()
  }, [])
  
  const { product } = useAppSelector(state => state.lesbases)
  const { data, form } = product
  const { openModal, openModalProduct } = form

  const handleClickStockAction = (type: string, productId: number) => {
    if (productId) {
      dispatch(toggleOpenModal(true))
      dispatch(setActionType(type))
      dispatch(setSelectedProduct(productId))
    }
  }

  const handleClickAddProduct = () => {
    dispatch(toggleOpenModalProduct(true))
  }

  return (
    <div className="p-6">
      <div className="text-center">

        <h1 className=" text-2xl text-center border-4 border-green-200 rounded px-4 py-2 inline-block bg-gradient-to-r from-yellow-200 to-green-200 font-bold">
          Les bases essentielles
        </h1>
      </div>

        <button onClick={handleClickAddProduct} className="px-2 py-1 border-2 rounded hover:bg-green-200 duration-200 mb-4">Ajouter produit</button>

        <div className=" flex flex-col gap-4">
          <h2 className=" underline underline-offset-2 font-lg">Suivi des ventes</h2>

          <div>
            <div className="grid grid-cols-8 bg-gray-200 p-1">
              <p>
                Nom
              </p>
              <p>
                Nombre de ventes
              </p>
              <p>
                Nombre d'achats
              </p>
              <p>
                Stock
              </p>
              <p>
                Prix unitaire
              </p>
              <p>
                Chiffre d'affaire (€)
              </p>
              <p>
                Gestion Stock
              </p>
              <p>
                Actions
              </p>
              
            </div>
            {data.map(product => (
              <div key={product.id} className="grid grid-cols-8 even:bg-blue-200 odd:bg-pink-200 p-1">
                <p>
                  {product.name}
                </p>
                <p>
                  {product.total_sales}
                </p>
                <p>
                  {product.total_purchases}
                </p>
                <p>
                  {product.total_purchases - product.total_sales}
                </p>
                <p>
                  {product.unit_price}
                </p>
                <p>
                  {product.total_sales*product.unit_price}
                </p>
                <div className="flex gap-2">
                  <span className=" bg-lime-200 p-1 rounded hover:cursor-pointer hover:bg-lime-300 duration-200 text-sm" onClick={() => handleClickStockAction("achat", product.id!)}>
                    ACHAT
                  </span>
                  <span className=" bg-teal-200 p-1 rounded hover:cursor-pointer hover:bg-teal-300 duration-200 text-sm" onClick={() => handleClickStockAction("vente", product.id!)}>
                    VENTE
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span onClick={() => console.log('lol')} className=" hover:cursor-pointer">
                    <Image
                      src={'/delete.png'}
                      width="20"
                      height="20"
                      alt="Icone de suppression"
                    />
                  </span>
                  <span onClick={() => console.log('lol')} className=" hover:cursor-pointer">
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

        {openModal && <StockAction/>}
        {openModalProduct && <AddProduct/>}
    </div>
  );
}
