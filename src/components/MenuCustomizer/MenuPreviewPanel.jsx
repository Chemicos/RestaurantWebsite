import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export default function MenuPreviewPanel({
   imageUrl,
   name,
   price,
   ingredients,
   quantity,
   setQuantity,
   selectedBauturi = {},
   selectedSosuri = {},
   selectedGarnitura = null,
   selectedSalate = []
  }) {

    const basePrice = Number(price) * quantity
    const bauturaTotal = Array.isArray(selectedBauturi) 
    ? selectedBauturi.reduce((acc, bautura) => {
      const price = Number(bautura?.price || 0)
      const qty = Number(bautura?.quantity || 0)
      return acc + price * qty
      }, 0)
    : 0

    const sosuriTotal = Array.isArray(selectedSosuri)
    ? selectedSosuri.reduce((acc, sos) => {
      const price = Number(sos?.price || 0)
      const qty = Number(sos?.quantity || 0)
      return acc + price * qty
    }, 0)
    : 0
    const totalPrice = basePrice + bauturaTotal + sosuriTotal

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-6">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-40 h-40 md:w-60 md:h-60 rounded-lg overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <p className="text-xl">{price} RON</p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="text-black">
              Ingrediente: 
              <span className="text-custom-gray"> {ingredients}</span>
            </p>

            {selectedGarnitura && (
              <p className="text-md text-start text-black">
                Garnitura:
                <span className="text-custom-gray"> {selectedGarnitura}</span>
              </p>
            )}

            {Object.keys(selectedSalate).length > 0 && (
              <div className="text-black">
                Salate:
                <ul className="mt-1">
                  {selectedSalate.map(({id, name, quantity}) => (
                    <li className="text-custom-gray" key={id}>
                      {name} x {quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(selectedSosuri) && selectedSosuri.length > 0 && (
              <div className="text-black">
                Sosuri:
                <ul className="mt-1">
                  {selectedSosuri.map(({id, name, quantity}) => (
                    <li className="text-custom-gray" key={id}>
                      {name} x {quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="bg-[#66635B]/30 text-gray-600 p-2 rounded-full cursor-pointer
            transition-all duration-100 active:scale-90 hover:bg-[#66635B]/60"
          >
            <MinusIcon size={25} weight="bold" />
          </button>

          <span className="text-xl font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="bg-custom-red text-white p-2 rounded-full cursor-pointer
            transition-all duration-100 active:scale-90 hover:bg-red-700"
          >
            <PlusIcon size={25} weight="bold" />
          </button>
        </div>

        <button 
          className="w-full mt-4 py-3 rounded-full text-white font-semibold bg-custom-red shadow-sm
          hover:bg-red-700 transition-colors duration-300"
        >
          Adauga {quantity} pentru {totalPrice.toFixed(2)} RON
        </button>
      </div>
    </div>
  )
}
