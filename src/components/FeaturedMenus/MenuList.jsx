import { CircularProgress } from '@mui/material'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import MenuCustomizer from '../MenuCustomizer/MenuCustomizer'

export default function MenuList() {
    const [menuItems, setMenuItems] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [isFading, setIsFading] = useState(false)
    const [isCustomizing, setIsCustomizing] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL
    const itemsPerPage = 4

    useEffect(() => {
        fetch(`${API_URL}/api/menus`)
        .then(res => res.json())
        .then(data => setMenuItems(data))
        .catch(err => console.error('Error loading menu:', err))
    }, [])

     const triggerFade = (callback) => {
        setIsFading(true)
        setTimeout(() => {
            callback()
            setIsFading(false)
        }, 300)
    }

    const handlePrev = () => {
        triggerFade(() => setStartIndex(prev => Math.max(prev - itemsPerPage, 0))) 
    }

    const handleNext = () => {
        if (startIndex + itemsPerPage < menuItems.length) {
            triggerFade(() => setStartIndex(prev => prev + itemsPerPage)) 
        }
    }

    const visibleItems = menuItems.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className='max-w-[1440px] mx-auto mt-14 px-6 lg:px-4'>
        <div className='flex w-full justify-between items-center mb-8'>
            <h2 className='text-3xl font-bold'>Ce mancam astazi?</h2>
            
            <div className='flex gap-4'>
                <button 
                    className='text-custom-red hover:bg-red-600 hover:text-white transition-colors duration-500 cursor-pointer rounded-full p-2
                    disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-600 disabled:cursor-not-allowed'
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                >
                    <CaretLeftIcon size={25} weight='bold' />
                </button>

                <button
                    className='text-custom-red hover:bg-red-600 hover:text-white transition-colors duration-500 cursor-pointer rounded-full p-2
                    disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-600 disabled:cursor-not-allowed'
                    onClick={handleNext}
                    disabled={startIndex + itemsPerPage >= menuItems.length}
                >
                    <CaretRightIcon size={25} weight='bold' />
                </button>
            </div>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8
            transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            {visibleItems.map(item => (
                <div key={item.id} className='flex flex-col items-center'>
                    <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className='w-full h-52 object-cover rounded-lg' 
                    />

                    <div className='p-4 flex flex-col items-center space-y-2'>
                        <h3 className='text-xl font-semibold text-center'>
                            {item.name}
                        </h3>
                        <p className='text-custom-red text-lg font-bold'>
                            {item.price} RON
                        </p>
                        <p className='text-sm text-center text-custom-gray'>
                            {item.description}
                        </p>

                        <button 
                            onClick={() => {
                                    setSelectedItem(item)
                                    setIsCustomizing(true)
                                }}
                            className='mt-4 px-4 py-2 text-md font-bold text-custom-red border border-custom-red cursor-pointer rounded-lg
                        hover:text-white hover:bg-red-600 transition-colors duration-300'
                        >
                            Personalizează
                        </button>
                        
                    </div>
                </div>
            ))}

            {isCustomizing && (
                <MenuCustomizer 
                    onClose={() => setIsCustomizing(false)} 
                    menuId={selectedItem.id}
                    imageUrl={selectedItem.image_url}
                    name={selectedItem.name}
                    price={selectedItem.price}
                    ingredients={selectedItem.ingredients}
                />
            )}
        </div>
    </div>
  )
}
