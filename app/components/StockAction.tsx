import { addPurchase, addSale, setQuantityInput, toggleOpenModal } from '@/redux/features/lesbases/lesbasesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'

function StockAction() {

    const dispatch = useAppDispatch()

    const { selectedProduct } = useAppSelector(state=> state.lesbases.product)
    const { form } = useAppSelector(state=> state.lesbases.product)
    const { quantity, actionType} = form

    const handleClickCloseModal = () => {
      dispatch(toggleOpenModal(false))
    }

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
    
      dispatch(setQuantityInput(value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (actionType == 'vente') await dispatch(addSale({product: selectedProduct, quantity: Number(quantity)}))
      if (actionType == 'achat') await dispatch(addPurchase({product: selectedProduct, quantity: Number(quantity)}))
      
      dispatch(toggleOpenModal(false))
    }

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-zinc-600  p-4'>

            <button onClick={handleClickCloseModal} className="border border-white text-white px-3 py-2 rounded mb-2">
                Fermer
            </button>
            <p className='text-white'>Enregistrer {actionType == 'vente' ? 'une' : 'un'} {actionType}</p>
            <form onSubmit={handleSubmit} className="">
              <div className='flex gap-2'>
                <div>
                  <label htmlFor="quantity" className="block font-medium mb-2 text-white">
                      Quantité
                  </label>
                  <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleChangeValue}
                      required
                      className="border p-2 mb-4 w-full text-black"
                  />
                </div>

              </div>

                <button type="submit" className="border border-white text-white px-4 py-2 rounded">
                    Enregistrer le mouvement
                </button>
            </form>
        </div>
    )
}

export default StockAction