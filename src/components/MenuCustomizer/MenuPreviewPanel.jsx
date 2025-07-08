import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export default function MenuPreviewPanel({
   imageUrl,
   name,
   price,
   ingredients,
   quantity,
   setQuantity
  }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 md:w-60 md:h-60 rounded-lg overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-xl">{price} RON</p>
          <p className="text-sm text-center text-custom-gray italic">
            {ingredients}
          </p>
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
          Adauga {quantity} pentru {quantity * price} RON
        </button>
      </div>
    </div>
  )
}
