/* eslint-disable no-unused-vars */
import { XIcon } from "@phosphor-icons/react";
import MenuCustomizerForm from "./MenuCustomizerForm";
import MenuPreviewPanel from "./MenuPreviewPanel";
import { useContext, useEffect, useState } from "react";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import AddMenu from "./AddMenu";
import { AuthContext } from "../../contexts/AuthContext";

export default function MenuCustomizer({ 
  onClose,
  menu,
  refreshOrders,
  mode = 'add',
  initialSelection = null,
  cartItemId = null,
  onEdited,
  onAdded
}) {
  const [quantity, setQuantity] = useState(initialSelection?.quantity ?? 1)
  const [selectedGarnitura, setSelectedGarnitura] = useState(initialSelection?.garnitura ?? null)
  const [selectedSalate, setSelectedSalate] = useState(initialSelection?.salate ?? [])
  const [selectedBauturi, setSelectedBauturi] = useState(initialSelection?.bauturi ?? [])
  const [selectedSosuri, setSelectedSosuri] = useState(initialSelection?.sosuri ?? [])

  const [isLoading, setIsLoading] = useState(true)
  const [garnituri, setGarnituri] = useState([])
  const [salate, setSalate] = useState([])
  const [bauturi, setBauturi] = useState([])
  const [sosuri, setSosuri] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const {fetchCartItems} = useCart()
  const {user} = useContext(AuthContext)

  const isInvalidGarnitura = garnituri.length > 0 && !selectedGarnitura

  const { id: menuId, image_url: imageUrl, name, price, ingredients } = menu || {}

  const API_URL = import.meta.env.VITE_API_URL
  const isMobile = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    if (!menuId) return

    const fetchCustomizeOptions = async () => {
      try {
        setIsLoading(true)

        const [garnituriRes, salateRes, bauturiRes, sosuriRes] = await Promise.all([
          fetch(`${API_URL}/api/garnituri`),
          fetch(`${API_URL}/api/salate`),
          fetch(`${API_URL}/api/bauturi`),
          fetch(`${API_URL}/api/sosuri`)
        ])

        const [garnituriData, salateData, bauturiData, sosuriData] = await Promise.all([
          garnituriRes.json(),
          salateRes.json(),
          bauturiRes.json(),
          sosuriRes.json()
        ])

        setGarnituri(garnituriData.filter(g => g.menu_id === menuId))
        setSalate(salateData.filter(s => s.menu_id === menuId))
        setBauturi(bauturiData.filter(b => b.menu_id === menuId))
        setSosuri(sosuriData.filter(ss => ss.menu_id === menuId))

      } catch (err) {
        console.error('Eroare la incarcarea optiunilor:', err)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }
    if (menuId) fetchCustomizeOptions()
  }, [menuId])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const basePrice = Number(price) || 0
  const bauturaTotal = Array.isArray(selectedBauturi) 
    ? selectedBauturi.reduce((acc, b) => acc + Number(b.price || 0) * Number(b.quantity || 0), 0)
    : 0

  const sosuriTotal = Array.isArray(selectedSosuri)
    ? selectedSosuri.reduce((acc, s) => acc + Number(s.price || 0) * Number(s.quantity || 0), 0)
    : 0

  const totalBeforeQty = basePrice + bauturaTotal + sosuriTotal
  const totalPrice = totalBeforeQty * quantity

  const handleAddOrder = async () => {
    let session_id = sessionStorage.getItem("session_id")
    const user_id = user?.id

    if (!user_id && !session_id) {
      session_id = crypto.randomUUID()
    }

    const orderPayload = {
      ...(user_id ? { user_id } : { session_id }),
      menu: {
        name,
        price: totalPrice,
        quantity,
        garnitura: selectedGarnitura,
        salate: selectedSalate,
        bauturi: selectedBauturi,
        sosuri: selectedSosuri
      }
    }

    sessionStorage.setItem("session_id", orderPayload.session_id)

    try {
      const url = mode === 'edit' 
        ? `${API_URL}/api/comenzi_temporare/${cartItemId}`
        : `${API_URL}/api/comenzi_temporare`

      const method = mode === 'edit' ? 'PATCH' : 'POST'

      await fetch(url, {
        method,
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(orderPayload)
      })

      if (typeof refreshOrders === 'function') refreshOrders()
      if (mode === 'edit' && typeof onEdited === 'function') onEdited()
      if (mode !== 'edit' && typeof onAdded === 'function') onAdded()

      onClose()
      if (location.pathname !== "/meniuri") navigate("/meniuri")
      await fetchCartItems()

    } catch (error) {
      console.error("Eroare la salvarea comenzii:", error)
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      >
          <motion.div 
            initial={{opacity: 0, scale: 0.85}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.2}}
            className={`relative bg-[#FEF7EA] w-full flex overflow-hidden
              ${isMobile ? 'h-screen flex-col' : 'max-w-5xl h-[85vh] flex-row rounded-xl'}
            `}
          >
            {isLoading ? (
              <div className="w-full flex justify-center items-center h-full">
                <CircularProgress color="error" />
              </div>
            ) : isMobile ? (
              <div className="flex flex-col h-full relative">
                <div className="flex flex-col gap-4 overflow-y-auto pb-36 px-6 pt-6">
                  <MenuPreviewPanel
                    imageUrl={imageUrl}
                    name={name}
                    price={price}
                    ingredients={ingredients}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    selectedBauturi={selectedBauturi}
                    selectedSosuri={selectedSosuri}
                    selectedGarnitura={selectedGarnitura}
                    selectedSalate={selectedSalate}
                    totalPrice={totalPrice}
                    handleAddOrder={handleAddOrder}
                    isInvalidGarnitura={isInvalidGarnitura}
                  />

                  <MenuCustomizerForm
                    onGarnituraSelect={setSelectedGarnitura}
                    onSalataSelect={setSelectedSalate}
                    onBauturaSelect={setSelectedBauturi}
                    onSosSelect={setSelectedSosuri}
                    garnituri={garnituri}
                    salate={salate}
                    bauturi={bauturi}
                    sosuri={sosuri}
                    defaults={initialSelection}
                  />
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-[#FEF7EA] px-6 py-4 border-t border-gray-300 z-10">
                  <AddMenu 
                    quantity={quantity}
                    setQuantity={setQuantity}
                    totalPrice={totalPrice}
                    handleAddOrder={handleAddOrder}
                    isEditing={mode === 'edit'}
                    isInvalidGarnitura={isInvalidGarnitura}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="w-1/2 p-12 overflow-y-auto border-r border-[#FEF7EA] shadow-xl">
                  <MenuCustomizerForm
                    onGarnituraSelect={setSelectedGarnitura}
                    onSalataSelect={setSelectedSalate}
                    onBauturaSelect={setSelectedBauturi}
                    onSosSelect={setSelectedSosuri}
                    garnituri={garnituri}
                    salate={salate}
                    bauturi={bauturi}
                    sosuri={sosuri}
                    defaults={initialSelection}
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
                    selectedBauturi={selectedBauturi}
                    selectedSosuri={selectedSosuri}
                    selectedGarnitura={selectedGarnitura}
                    selectedSalate={selectedSalate}
                    totalPrice={totalPrice}
                    handleAddOrder={handleAddOrder}
                    isEditing={mode === 'edit'}
                    isInvalidGarnitura={isInvalidGarnitura}
                  />
                </div>
              </>
            )}
            <button
                onClick={onClose} 
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-[#66635B]/30 cursor-pointer
                transition-all hover:bg-red-600 active:bg-red-600 hover:shadow-lg"
            >
                <XIcon size={20} weight="bold" />
            </button>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
