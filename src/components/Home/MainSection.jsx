import React, { useEffect, useState } from 'react'
import { ClockIcon } from '@phosphor-icons/react'
import { Skeleton } from '@mui/material'
import { useInView } from 'react-intersection-observer'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const images = [
  "/assets/cartofi_condimentati.jpg",
  "/assets/pizza_casei.jpg",
  "/assets/pizza_ton.png",
  "/assets/spaghete_bolognese.jpg"
]

export default function MainSection() {
  const {t} = useTranslation()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-[100svh] xl:min-h-screen mt-36 xl:mt-0 flex justify-center items-center px-6'>
      <div className='max-w-[1440px] w-full flex flex-col xl:flex-row justify-between items-center gap-8 xl:gap-4'>
        <motion.div 
          className='flex flex-col gap-12 xl:gap-8'
          ref={ref}
          initial={{ opacity: 0, x: -80}}
          animate={inView ? {opacity: 1, x: 0} : {}}
          transition={{duration: 0.5, ease: 'easeOut'}}
        >
          <div className='text-center xl:text-start'>
            <span className='text-custom-red font-bold text-2xl sm:text-[36px]'>{t('homeMain.welcome')}</span>
            <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight'>
              {t('homeMain.title1')} <br/> 
              {t('homeMain.title2')} <span className='text-custom-red'>{t('homeMain.highlight')}</span>
            </h1>
          </div>

          <p className='text-gray-700 text-md sm:text-xl text-center xl:text-start leading-relaxed max-w-xl'>
            {t('homeMain.subtitle')}
          </p>
          
          <NavLink className='w-fit mx-auto xl:mx-0' to='/meniuri'>          
            <button className='w-fit bg-custom-red hover:bg-red-700 text-white font-semibold 
              py-4 px-8 text-lg xl:text-xl rounded-xl transition-all cursor-pointer shadow-md active:scale-90'
            >
              {t('homeMain.button')}
            </button>
          </NavLink>

          <div className='w-full flex items-center justify-center xl:justify-start gap-4 text-md text-gray-700'>
            <ClockIcon 
              size={32} 
              color='red' 
              weight='regular'
              className='animate-pulse-scale'
            />
            
            <div>
              <p>{t('homeMain.schedule.weekdays')}</p>
              <p>{t('homeMain.schedule.weekend')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          ref={ref}
          initial={{opacity: 0, x: 80}}
          animate={inView ? {opacity: 1, x: 0} : {}}
          transition={{ duration: 0.5, ease: 'easeOut'}}
          className='w-full max-w-[700px] h-[350px] sm:h-[480px] xl:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative'
        >
          {isLoading ? (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              sx={{bgcolor: '#66635B'}}
            />
          ) : (
            <>
            {images.map((src, index) => (
              <img key={index} src={src} alt={`slide-${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              />
            ))}
            <div className='w-full h-full bg-black opacity-20 absolute inset-y-0 z-10'></div>

            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-20'>
              {images.map((_, index) => (
                <div key={index} 
                  className={`w-8 h-2 rounded-full transition-colors duration-300 ${index === currentIndex ? "bg-custom-red": "bg-white"}`}
                ></div>
              ))}
            </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
