import { addProduct, addPurchase, addSale, setProductNameForm, setProductPriceForm, setQuantityInput, toggleOpenModal, toggleOpenModalProduct } from '@/redux/features/lesbases/lesbasesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

function AddProduct() {

    const dispatch = useAppDispatch()

    const { form } = useAppSelector(state=> state.lesbases.product)
    const { name, unit_price} = form

    const handleClickCloseModal = () => {
      dispatch(toggleOpenModalProduct(false))
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
    
      dispatch(setProductNameForm(value));
    }

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
    
      dispatch(setProductPriceForm(value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      dispatch(addProduct({name, unit_price}))
      dispatch(toggleOpenModalProduct(false))
    }

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-zinc-600  p-4'>

            <button onClick={handleClickCloseModal} className="border border-white text-white px-3 py-2 rounded mb-2">
                Fermer
            </button>
            <p className='text-white'>Enregistrer un nouveeau produit</p>
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
                      Prix
                  </label>
                  <input
                      type="text"
                      id="price"
                      name="price"
                      value={unit_price}
                      onChange={handleChangePrice}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

              </div>

                <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                    Enregistrer le produit
                </button>
            </form>
        </div>
    )
}

export default AddProduct