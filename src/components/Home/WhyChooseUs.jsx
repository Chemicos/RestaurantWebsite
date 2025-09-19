import { ChefHatIcon, CreditCardIcon, PhoneIcon, HamburgerIcon, TruckIcon, PaletteIcon } from '@phosphor-icons/react'
import React, { useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'

const bakingPizza = '/assets/chefbakingpizza.jpg'
const features = [
    {
      key: 'produse',
      label: 'Produse',
      icon: <HamburgerIcon size={36} weight='duotone' className='text-custom-red'/>,
      title: "Produse Diversificate",
      desc: "Meniu gandit pentru toate gusturile: pizza clasica sau speciala, paste cremoase, salate fresh si deserturi lejere. " +
      "Combina optiunile dupa preferinte si personalizeaza-ti usor comanda."
    },
    {
      key: 'plata',
      label: 'Plata',
      icon: <CreditCardIcon size={36} weight='duotone' className='text-custom-red' />,
      title: "Plata Card",
      desc: "Platesti in siguranta, fara numerar. Acceptam carduri la livrare si online prin sesiune de plata securizata. " +
      "Primesti pe email confirmarea tranzactiei, simplu si rapid."
    },
    {
      key: 'comanda',
      label: 'Comanda',
      icon: <PhoneIcon size={36} weight='duotone' className='text-custom-red' />,
      title: "Comanda Telefonic",
      desc: "Preferi să discuti cu cineva? Suna-ne si te ajutam sa alegi meniul potrivit, " +
      "sa personalizezi preparatele si sa plasezi comanda in cateva minute."
    },
    {
      key: 'meniuri',
      label: 'Meniuri',
      icon: <PaletteIcon size={36} weight='duotone' className='text-custom-red' />,
      title: "Meniuri Personalizate",
      desc: "De la alegerea garniturii, la alegerea sucului, noi iti oferim posibilitatea de a personaliza meniul dorit."
    },
    {
      key: 'livrare',
      label: 'Livrare',
      icon: <TruckIcon size={36} weight='duotone' className='text-custom-red' />,
      title: "Livrare Rapida",
      desc: "Ajungem prompt in Clinceni, Ordoreanu, Domnesti si Bragadiru. " +
      "Ne organizam pe rute scurte pentru ca mancarea sa fie fierbinte si delicioasa."
    }
]

const stack_offset = 10
const card_height = 220

const useRandomTransforms = (n) => {
  return useMemo(
    () =>
      Array.from({ length: n }).map(() => ({
        rotate: Math.random() * 100 - 50,
        xPct: (Math.random() * 1 + 1) * 100, 
        yPct: -(Math.random() * 60),         
        scale: Math.random() * 0.4 + 0.3,    
        skewX: Math.random() * 12,
        skewY: Math.random() * 12,
      })),
    [n]
  )
}

function useIsXL() {
  const [isXL, setIsXL] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1280px)').matches : true
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1280px)')
    const handler = e => setIsXL(e.matches)
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler)
    }
  }, [])
  return isXL
}
export default function WhyChooseUs() {
  const [active, setActive] = useState(2)
  const randoms = useRandomTransforms(features.length)
  const isXl = useIsXL()

  return (
    <section className="min-h-screen max-w-[1440px] mx-auto px-4 py-12 md:py-20 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, x: -90 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl xl:text-5xl font-semibold mb-8 md:mb-10 text-center xl:text-left"
      >
        De ce noi<span className='text-custom-red'> ?</span>
      </motion.h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 sm:gap-14 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[700px] rounded-2xl overflow-hidden shadow-xl mx-auto xl:mx-0"
        >
          <img
            src={bakingPizza}
            alt="Pizza scoasa din cuptor"
            className="w-full h-[260px] sm:h-[360px] xl:h-[460px] object-cover"
          />
        </motion.div>

        <div className="w-full flex flex-col items-center gap-10">
          <motion.nav
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Schimba subiectul cardurilor"
            className="flex flex-col sm:flex-row items-center gap-6 justify-center xl:justify-start"
          >
            {features.map((t, i) => {
              const isActive = i === active
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(i)}
                  className={`relative pb-1 text-[17px] font-medium transition-colors
                    ${isActive ? "text-black" : "text-[#66635B] hover:text-black"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-1 h-[3px] rounded-full
                      transition-all duration-300
                      ${isActive ? "opacity-100 scale-x-100 bg-black" : "opacity-0 scale-x-50 bg-black"}`}
                  />
                </button>
              )
            })}
          </motion.nav>

          {isXl ? (
            <motion.div
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[700px]"
            style={{ height: card_height + stack_offset * (features.length - 1) }}
          >

            {features.map((f, i) => {
              const isHidden = i < active
              const z = features.length - i
              const r = randoms[i] ?? { xPct: 120, yPct: -20, rotate: 0, scale: 0.6, skewX: 0, skewY: 0 }

              return (
                <AnimatePresence key={f.key}>
                  <motion.article
                    role="article"
                    className="absolute left-0 right-0 mx-auto w-[400px] bg-[#FFF1C9] rounded-xl border border-black/10
                      shadow-lg z-10"
                    style={{ zIndex: 10 + z }}
                    initial={false}
                    animate={{
                      x: isHidden ? `${r.xPct}%` : i * stack_offset,
                      y: isHidden ? r.yPct : i * stack_offset,
                      rotate: isHidden ? r.rotate : 0,
                      scale: isHidden ? r.scale : 1,
                      skewX: isHidden ? r.skewX : 0,
                      skewY: isHidden ? r.skewY : 0,
                      opacity: isHidden ? 0 : 1,
                      pointerEvents: isHidden ? 'none' : 'auto',
                      visibility: isHidden ? 'hidden' : 'visible',
                    }}
                    transition={{ duration: isHidden ? 0.65 : 0.35, ease: 'easeOut' }}
                  >
                    <div className="p-6 h-[200px]">
                      <header className="flex items-center gap-3 mb-3">
                        <div className="grid place-items-center w-12 h-12 rounded-full bg-[#FFD980] ring-1 ring-black/5">
                          {f.icon}
                        </div>
                        <h3 className="text-2xl font-semibold">{f.title}</h3>
                      </header>
                      <p className="text-[15px] leading-relaxed text-[#3c3c3c]">{f.desc}</p>
                    </div>
                  </motion.article>
                </AnimatePresence>
              )
            })}
          </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.article
                key={features[active].key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-[540px] mx-auto bg-[#FFF1C9] rounded-xl border border-black/10 shadow-lg"
              >
                <div className="p-6">
                  <header className="flex items-center gap-3 mb-3">
                    <div className="grid place-items-center w-12 h-12 rounded-full bg-[#FFD980] ring-1 ring-black/5">
                      {features[active].icon}
                    </div>
                    <h3 className="text-2xl font-semibold">{features[active].title}</h3>
                  </header>
                  <p className="text-[15px] leading-relaxed text-[#3c3c3c]">
                    {features[active].desc}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          )}      
        </div>
      </div>
    </section>
  )
}
