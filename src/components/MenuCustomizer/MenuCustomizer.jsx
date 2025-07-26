/* eslint-disable no-unused-vars */
import { XIcon } from "@phosphor-icons/react";
import MenuCustomizerForm from "./MenuCustomizerForm";
import MenuPreviewPanel from "./MenuPreviewPanel";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuCustomizer({ 
  onClose,
  menuId,
  imageUrl,
  name,
  price,
  ingredients,
  refreshOrders
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedGarnitura, setSelectedGarnitura] = useState(null)
  const [selectedSalate, setSelectedSalate] = useState([])
  const [selectedBauturi, setSelectedBauturi] = useState({})
  const [selectedSosuri, setSelectedSosuri] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [garnituri, setGarnituri] = useState([])
  const [salate, setSalate] = useState([])
  const [bauturi, setBauturi] = useState([])
  const [sosuri, setSosuri] = useState([])

  const API_URL = import.meta.env.VITE_API_URL

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
            className="relative bg-[#FEF7EA] rounded-xl w-full max-w-5xl h-[85vh] flex overflow-hidden"
          >
            {isLoading ? (
              <div className="w-full flex justify-center items-center h-full">
                <CircularProgress color="error" />
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
                      onClose={onClose}
                      refreshOrders={refreshOrders}
                    />
                </div>
              </>
            )}
            <button
                onClick={onClose} 
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-[#66635B]/30 cursor-pointer
                transition-colors duration-300 hover:bg-red-600 hover:shadow-lg"
            >
                <XIcon size={20} weight="bold" />
            </button>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
