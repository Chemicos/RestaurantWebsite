import React from 'react'
// import logo from '../../assets/logoPizzerie.png'
import { EnvelopeIcon, FacebookLogoIcon, InstagramLogoIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className='w-full bg-custom-black mt-14 px-8 lg:px-0 py-12'>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-20 flex-wrap'>
            <div className='flex-shrink-0'>
                <img 
                    src={`/assets/logoPizzerie.png`} 
                    alt="logo"
                    className='h-50' 
                />
            </div>

            <div className='flex flex-col lg:flex-row flex-wrap gap-2 lg:gap-10'>
                <div className='flex flex-col items-start gap-1'>
                    <h3 className='text-white mb-4 font-semibold text-2xl'>Contact</h3>

                    <div className='flex items-center gap-2'>
                        <MapPinIcon size={20} color='white' weight='fill' />
                        <a className='text-white' href="https://www.google.com/maps/">Str principala nr.204</a>
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
                        <a href="#" className='text-white hover:text-red-600 transition-color duration-300 cursor-pointer'>
                            <InstagramLogoIcon size={30} weight='fill' />
                        </a>
                        <a href="#" className='text-white hover:text-red-600 transition-color duration-300 cursor-pointer'>
                            <FacebookLogoIcon size={30} weight='fill' />
                        </a>
                    </div>
                </div>

                <div className='lg:h-full w-[1px] bg-custom-gray'></div>

                <div className='flex flex-col items-start gap-1'>
                    <h3 className='text-white mb-4 font-semibold text-2xl'>Informatii</h3>
                    <a className='text-white block' href="">Cum comand</a>
                    <a className='text-white block' href="">Detalii plata</a>
                    <a className='text-white block' href="">Detalii livrare</a>
                    <a className='text-white block' href="">Politica retur</a>
                </div>

                <div className='lg:h-full w-[1px] bg-custom-gray'></div>

                <div className='flex flex-col items-start gap-1'>
                    <h3 className='text-white mb-4 font-semibold text-2xl'>Date Comerciale</h3>
                    <p className='text-white'>SC & SRL</p>
                    <p className='text-white'>CUI RO: 02045SOMETHING</p>
                    <p className='text-white'>Punct de lucru: ceva strada</p>
                    <p className='text-white'>Com. Clinceni, Jud. Ilfov</p>
                </div>
            </div>
        </div>

        <div className='text-white max-w-[1440px] mx-auto text-center mt-4 lg:text-right text-sm'>@ Copyright 2016 - 2025 Pizeria Clinceni</div>
    </footer>
  )
}
