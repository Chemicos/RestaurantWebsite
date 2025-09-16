import { ChefHatIcon, CreditCardIcon, PhoneIcon, HamburgerIcon, TruckIcon } from '@phosphor-icons/react'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'

const bakingPizza = '/assets/chefbakingpizza.jpg'
const features = [
    {
        icon: <HamburgerIcon size={50} weight='duotone' className='text-custom-red'/>,
        title: "Produse Diversificate",
        desc: "Tu alegi meniul"
    },
    {
        icon: <CreditCardIcon size={50} weight='duotone' className='text-custom-red' />,
        title: "Plata Card",
        desc: "Platesti cu cardul la livrare"
    },
    {
        icon: <PhoneIcon size={50} weight='duotone' className='text-custom-red' />,
        title: "Comanda Telefonic",
        desc: "Va ajutam sa gasiti meniul dorit"
    },
    {
        icon: <ChefHatIcon size={50} weight='duotone' className='text-custom-red' />,
        title: "Ingrediente Proaspete",
        desc: "Folosim ingrediente proaspete"
    },
    {
        icon: <TruckIcon size={50} weight='duotone' className='text-custom-red' />,
        title: "Livrare Rapida",
        desc: "Livrare in Clinceni, Ordoreanu, Domnesti si Bragadiru"
    }
]

const listVariants = {
    hidden: {},
    show: {
        transition: {staggerChildren: 0.12}
    }
}

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function WhyChooseUs() {
    // const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="min-h-screen max-w-[1440px] mx-auto px-4 py-12 md:py-20">
      <motion.h2 

        className="text-4xl xl:text-5xl text-center xl:text-start font-semibold mb-8 md:mb-10"
      >
        De ce noi?
      </motion.h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={bakingPizza}
            alt="Pizza scoasa din cuptor"
            className="w-full h-[260px] sm:h-[360px] xl:h-[460px] object-cover"
          />
        </motion.div>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {features.map(({ icon, title, desc }, i) => (
            <motion.li
              key={title + i}
              variants={itemVariants}
              className="flex items-start gap-6 rounded-xl bg-[#FFF6D9] p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative place-items-center w-14 h-14 rounded-full bg-[#FFD980] ring-1 ring-black/5">
                <span className="absolute inset-y-0 top-4 -right-2 text-custom-red">{icon}</span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-[#2c2c2c] leading-tight">
                  {title}
                </h3>
                <p className="text-sm text-custom-gray mt-1">{desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
