import { XIcon } from "@phosphor-icons/react";
import MenuCustomizerForm from "./MenuCustomizerForm";
import MenuPreviewPanel from "./MenuPreviewPanel";
import { useState } from "react";

export default function MenuCustomizer({ 
  onClose,
  menuId,
  imageUrl,
  name,
  price,
  ingredients
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedBautura, setSelectedBautura] = useState(null)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-[#FEF7EA] rounded-xl w-full max-w-5xl h-[85vh] flex overflow-hidden">
        <div className="w-1/2 p-12 overflow-y-auto border-r border-[#FEF7EA] shadow-xl">
            <MenuCustomizerForm
              onBauturaSelect={setSelectedBautura}
              menuId={menuId}
            />
        </div>

        <div className="w-1/2 p-12">
            <MenuPreviewPanel
              imageUrl={imageUrl}
              name={name}
              price={price}
              ingredients={ingredients}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedBautura={selectedBautura}
            />
        </div>
        <button
            onClick={onClose} 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-[#66635B]/30 cursor-pointer
            transition-colors duration-300 hover:bg-red-600 hover:shadow-lg"
        >
            <XIcon size={20} weight="bold" />
        </button>
      </div>

    </div>
  )
}
