import { ChefHatIcon, CreditCardIcon, PhoneIcon, HamburgerIcon, TruckIcon } from '@phosphor-icons/react'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
    {
        icon: <HamburgerIcon size={80} weight='duotone' className='text-custom-red'/>,
        title: "Produse Diversificate",
        desc: "Tu alegi meniul"
    },
    {
        icon: <CreditCardIcon size={70} weight='duotone' className='text-custom-red' />,
        title: "Plata Card",
        desc: "Platesti cu cardul la livrare"
    },
    {
        icon: <PhoneIcon size={70} weight='duotone' className='text-custom-red' />,
        title: "Comanda Telefonic",
        desc: "Va ajutam sa gasiti meniul dorit"
    },
    {
        icon: <ChefHatIcon size={70} weight='duotone' className='text-custom-red' />,
        title: "Ingrediente Proaspete",
        desc: "Folosim ingrediente proaspete"
    },
    {
        icon: <TruckIcon size={70} weight='duotone' className='text-custom-red' />,
        title: "Livrare Rapida",
        desc: "Livrare in Clinceni, Ordoreanu, Domnesti si Bragadiru"
    }
]

export default function WhyChooseUs() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div className='flex justify-center px-4 py-10 md:py-16'>
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 80}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 1, ease: 'easeOut'}}
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-12 w-full max-w-[1440px]'
        >
            {features.map((feature, index) => (
                <div 
                    key={index} 
                    className='flex flex-col items-center text-center'
                >
                    <div className='relative flex items-end justify-center h-28 w-28 rounded-full bg-custom-yellow mb-4'>
                        <div className='absolute top-12 -right-2'>
                            {feature.icon}
                        </div>
                    </div>
                    <h4 className='font-bold text-lg mb-1'>{feature.title}</h4>
                    <p className='text-sm text-custom-gray'>{feature.desc}</p>
                </div>
            ))}
        </motion.div>
    </div>
  )
}
