import React, { useEffect, useState } from 'react'
import GarnishSection from './OptionSections/GarnishSection'
import SaladSection from './OptionSections/SaladSection'
import SauceSection from './OptionSections/SauceSection'
import DrinksSection from './OptionSections/DrinksSection'

export default function MenuCustomizerForm({ 
  onGarnituraSelect,
  onBauturaSelect,
  onSosSelect,
  garnituri,
  salate, 
  bauturi, 
  sosuri 
}) {
  const [selectedGarnitura, setSelectedGarnitura] = useState(null)
  const [selectedSalate, setSelectedSalate] = useState({})
  const [selectedBauturi, setSelectedBauturi] = useState({})
  const [selectedSosuri, setSelectedSosuri] = useState({})

  const updateSosuriQuantity = (id, delta) => {
    setSelectedSosuri(prev => {
      const newQty = (prev[id] || 0) + delta

      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [id]: newQty }
    })
  }

  const toggleSos = (id) => {
    setSelectedSosuri(prev => {
      if (prev[id]) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: 1 }
    })
  }

  const updateSalataQuantity = (salataId, delta) => {
    setSelectedSalate(prev => {
      const newQty = (prev[salataId] || 0) + delta
      if (newQty <= 0) {
        const { [salataId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [salataId]: newQty}
    })
  }

  const toggleSalata = (id) => {
    setSelectedSalate(prev => {
      if (prev[id]) {
        const { [id]: _, ...rest} = prev
        return rest
      }
      return {...prev, [id]: 1}
    })
  }

  const updateBauturaQuantity = (id, delta) => {
    setSelectedBauturi(prev => {
      const newQty = (prev[id] || 0) + delta
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newQty}
    })
  }

  const toggleBautura = (id) => {
    setSelectedBauturi(prev => {
      if (prev[id]) {
        const { [id]: _, ...rest} = prev
        return rest
      }
      return { ...prev, [id]: 1}
    })
  }

  useEffect(() => {
    if(typeof selectedGarnitura === 'string') {
      onGarnituraSelect(selectedGarnitura)
    }
  }, [selectedGarnitura, onGarnituraSelect])

  useEffect(() => {
  const bauturiArray = Object.entries(selectedBauturi).map(([id, qty]) => {
    const bautura = bauturi.find(b => b.id === Number(id))
    return {
      id: Number(id),
      name: bautura?.name || '',
      price: Number(bautura?.price), 
      quantity: Number(qty) 
    }
  })
  onBauturaSelect(bauturiArray)
  }, [selectedBauturi, bauturi, onBauturaSelect])

  useEffect(() => {
  const sosuriArray = Object.entries(selectedSosuri).map(([id, qty]) => {
    const sos = sosuri.find(s => s.id === Number(id))
    return {
      id: Number(id),
      name: sos?.name || '',
      price: Number(sos?.price),
      quantity: Number(qty)
    }
  })
  onSosSelect(sosuriArray)
}, [selectedSosuri, sosuri, onSosSelect])

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col gap-6'>
        {garnituri.length > 0 && (
          <GarnishSection
            garnituri={garnituri}
            selectedGarnitura={selectedGarnitura}
            setSelectedGarnitura={setSelectedGarnitura}
          />
        )}

        {salate.length > 0 && (
          <SaladSection
            salate={salate}
            selectedSalate={selectedSalate}
            toggleSalata={toggleSalata}
            updateSalataQuantity={updateSalataQuantity}
          />        
        )}

        {sosuri.length > 0 && (
          <SauceSection 
            sosuri={sosuri}
            selectedSosuri={selectedSosuri}
            toggleSos={toggleSos}
            updateSosuriQuantity={updateSosuriQuantity}
          />
        )}

        <DrinksSection 
          bauturi={bauturi}
          selectedBauturi={selectedBauturi}
          toggleBautura={toggleBautura}
          updateBauturaQuantity={updateBauturaQuantity}
        />
      </div>
    </div>
  )
}
