import React, { useState } from 'react'
// import logo from '../../assets/logoPizzerie.png'
import { EnvelopeIcon, FacebookLogoIcon, InstagramLogoIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react'
import { useInView } from 'react-intersection-observer'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    const [activeIcon, setActiveIcon] = useState(null)

    const hoverEffectText = `transition-colors hover:text-red-500`
    const handleClick = (icon) => {
        setActiveIcon(icon)
        setTimeout(() => {
            setActiveIcon(null)
        }, 200)
    }

    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <footer className='w-full bg-custom-black mt-14 px-0 lg:px-4 py-12'>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-20 flex-wrap'>
            <div className='flex-shrink-0'>
                <img 
                    src={`/assets/logoPizzerie.png`} 
                    alt="logo"
                    className='h-50' 
                />
            </div>

            <motion.div 
                ref={ref}
                initial={{opacity: 0, y: 80}}
                animate={inView ? {opacity: 1, y: 0} : {}}
                transition={{ duration: 0.5, ease: 'easeOut'}}
                className='flex flex-col lg:flex-row flex-wrap gap-2 lg:gap-10'
            >
                <div className='flex flex-col items-start gap-2 md:gap-1'>
                    <h3 className='text-white mb-4 font-semibold text-2xl'>Contact</h3>

                    <div className='flex items-center gap-2'>
                        <MapPinIcon size={20} color='white' weight='fill' />
                        <a className={`text-white ${hoverEffectText}`} href="https://www.google.com/maps/">Str principala nr.204</a>
                    </div>

                    <div className='flex items-center gap-2'>
                        <PhoneIcon size={20} color='white' weight='fill' />
                        <p className='text-white'>0314829480</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <EnvelopeIcon size={20} color='white' weight='fill' />
                        <p className='text-white'>comenzi@pizzeriaclinceni.ro</p>
                    </div>

                    <div className='flex gap-3'>
                        <a 
                            onClick={() => handleClick('instagram')} 
                            className={`hover:text-red-600 transition-color duration-300 cursor-pointer
                            ${activeIcon === 'instagram' ? 'text-red-600' : 'text-white'}`}
                        >
                            <InstagramLogoIcon size={30} weight='fill' />
                        </a>
                        <a 
                            onClick={() => handleClick('facebook')} 
                            className={`hover:text-red-600 transition-color duration-300 cursor-pointer
                            ${activeIcon === 'facebook' ? 'text-red-600' : 'text-white'}`}>
                            <FacebookLogoIcon size={30} weight='fill' />
                        </a>
                    </div>
                </div>

                <div className='h-[1px] lg:h-auto w-auto lg:w-[1px] bg-custom-gray'></div>

                <div className='flex flex-col items-start gap-2 md:gap-1'>
                    <h3 className='text-white mb-4 font-semibold text-2xl'>Informatii</h3>
                    <NavLink className={`text-white block ${hoverEffectText}`} to='/informatii?topic=cum-comand' >
                        Cum comand
                    </NavLink>
                    <NavLink className={`text-white block ${hoverEffectText}`} to='/informatii?topic=livrare' >
                        Detalii livrare
                    </NavLink>
                    <NavLink className={`text-white block ${hoverEffectText}`} to='/informatii?topic=plata' >
                        Detalii plata
                    </NavLink>
                    <NavLink className={`text-white block ${hoverEffectText}`} to='/informatii?topic=despre' >
                        Despre
                    </NavLink>
                </div>

                <div className='h-[1px] lg:h-auto w-auto lg:w-[1px] bg-custom-gray'></div>

                <div className='flex flex-col items-start gap-2 md:gap-1'>
                    <h3 className='text-white mb-4 font-semibold text-2xl'>Date Comerciale</h3>
                    <p className='text-white'>SC & SRL</p>
                    <p className='text-white'>CUI RO: 02045SOMETHING</p>
                    <p className='text-white'>Punct de lucru: ceva strada</p>
                    <p className='text-white'>Com. Clinceni, Jud. Ilfov</p>
                </div>
            </motion.div>
        </div>

        <div className='text-white max-w-[1440px] mx-auto text-center mt-4 lg:text-right text-sm'>@ Copyright 2016 - 2025 Pizeria Clinceni</div>
    </footer>
  )
}
