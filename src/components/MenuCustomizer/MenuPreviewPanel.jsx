import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import AddMenu from "./AddMenu";
import { useMediaQuery } from "@mui/material";

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
   selectedSalate = [],
   totalPrice,
   handleAddOrder,
   isEditing = false,
   isInvalidGarnitura = false
  }) {

  const isMobile = useMediaQuery('(max-width: 1024px)')
  return (
    <div className={`w-full ${isMobile ? '' : 'h-full'} flex flex-col items-center justify-between gap-6`}>
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-40 h-40 md:w-60 md:h-60 rounded-lg overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <p className="text-xl">{price} RON</p>
          </div>

          <div className="flex flex-col items-start max-h-60 gap-2 overflow-y-auto">
            {ingredients && (
              <p className="text-black">
                Ingrediente: 
                <span className="text-custom-gray"> {ingredients}</span>
              </p>
            )}

            {selectedGarnitura && (
              <p className="text-md text-start text-black">
                Garnitură:
                <span className="text-custom-gray"> {selectedGarnitura}</span>
              </p>
            )}

            {Array.isArray(selectedSalate) && selectedSalate.length > 0 && (
              <p className="text-black">
                Salate:
                <span className="text-custom-gray">
                  {' '}{selectedSalate.map(s => `${s.name} x${s.quantity}`).join(', ')}
                </span>
              </p>
            )}

            {Array.isArray(selectedSosuri) && selectedSosuri.length > 0 && (
              <p className="text-black">
                Sosuri:
                <span className="text-custom-gray">
                  {' '}{selectedSosuri.map(ss => `${ss.name} x${ss.quantity}`).join(', ')}
                </span>
              </p>
            )}

            {Array.isArray(selectedBauturi) && selectedBauturi.length > 0 && (
              <p className="text-black">
                Băuturi:
                <span className="text-custom-gray">
                  {' '}{selectedBauturi.map(b => `${b.name} x${b.quantity}`).join(', ')}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      {!isMobile && (
        <AddMenu
          quantity={quantity}
          setQuantity={setQuantity}
          totalPrice={totalPrice}
          handleAddOrder={handleAddOrder}
          isEditing={isEditing}
          isInvalidGarnitura={isInvalidGarnitura}
        />
      )}
    </div>
  )
}
