import { CircularProgress, useMediaQuery } from '@mui/material'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import MenuCustomizer from '../MenuCustomizer/MenuCustomizer'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function MenuList({refreshOrders}) {
    const [menuItems, setMenuItems] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [isFading, setIsFading] = useState(false)
    const [isCustomizing, setIsCustomizing] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const fadeVariants = {
        hidden: { opacity: 0, y: 80 },
        fadeOut: {opacity: 0},
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
    }

    const API_URL = import.meta.env.VITE_API_URL

    const isMobile = useMediaQuery('(max-width: 1280px)')
    const itemsPerPage = isMobile ? 1 : 4

    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

    useEffect(() => {
        fetch(`${API_URL}/api/menus`)
        .then(res => res.json())
        .then(data => setMenuItems(data))
        .catch(err => console.error('Error loading menu:', err))
    }, [])

    useEffect(() => {
        setStartIndex(prev => {
            const maxStart = Math.max(0, menuItems.length - itemsPerPage)
            return Math.min(prev - (prev % itemsPerPage), maxStart)
        })
    }, [itemsPerPage, menuItems.length])

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
    const canPrev = startIndex > 0
    const canNext = startIndex + itemsPerPage < menuItems.length

  return (
    <AnimatePresence>
        <div className='max-w-[1440px] mx-auto px-6 lg:px-4 py-14 xl:py-20'>
            <div className='flex flex-col xl:flex-row w-full gap-4 items-center justify-center xl:justify-start mb-8 xl:mb-16'>
                <motion.h2 
                    initial={{ opacity: 0, x: -90 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}  
                    className='text-4xl sm:text-5xl font-semibold'
                >
                    Ce mâncăm astăzi<span className='text-custom-red'>?</span>
                </motion.h2>
                
                <div className='flex gap-4'>
                    <button 
                        className='text-custom-red hover:bg-red-600 active:bg-red-600 active:text-white hover:text-white transition-all duration-500 cursor-pointer rounded-full p-2
                        disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-600 disabled:cursor-not-allowed'
                        onClick={handlePrev}
                        disabled={!canPrev}
                    >
                        <CaretLeftIcon size={25} weight='bold' />
                    </button>

                    <button
                        className='text-custom-red hover:bg-red-600 active:bg-red-600 active:text-white hover:text-white transition-all duration-500 cursor-pointer rounded-full p-2
                        disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-600 disabled:cursor-not-allowed'
                        onClick={handleNext}
                        disabled={!canNext}
                    >
                        <CaretRightIcon size={25} weight='bold' />
                    </button>
                </div>
            </div>
            <motion.div 
                ref={ref}
                variants={fadeVariants}
                initial="hidden"
                animate={inView ? (isFading ? "fadeOut" : "visible") : "hidden"}
        
                className={`h-full grid grid-cols-1 xl:grid-cols-4 w-ful xl:w-full gap-8 justify-items-center`}
            >
                {visibleItems.map(item => (
                    <div key={item.id} className='max-w-[450px] flex flex-col items-center justify-between'>
                        <img 
                            src={item.image_url} 
                            alt={item.name} 
                            className='w-full h-52 object-cover rounded-xl' 
                        />

                        <div className='p-4 flex flex-col items-center space-y-2'>
                            <h3 className='text-xl font-semibold text-center'>
                                {item.name}
                            </h3>
                            <p className='text-custom-red text-lg font-bold'>
                                {item.price} RON
                            </p>
                            <p className='text-sm text-center text-custom-gray'>
                                {item.ingredients}
                            </p>

                            <button 
                                onClick={() => {
                                        setSelectedItem(item)
                                        setIsCustomizing(true)
                                    }}
                                className='mt-4 px-4 py-2 text-md font-bold text-custom-red border border-custom-red cursor-pointer rounded-lg
                            hover:text-white active:text-white hover:bg-red-600 active:bg-red-600 transition-colors duration-300'
                            >
                                Personalizează
                            </button>              
                        </div>
                    </div>
                ))}

                {isCustomizing && (
                    <MenuCustomizer 
                        onClose={() => setIsCustomizing(false)} 
                        menu={selectedItem}
                        refreshOrders={refreshOrders}
                    />
                )}
            </motion.div>
        </div>
    </AnimatePresence>
  )
}
