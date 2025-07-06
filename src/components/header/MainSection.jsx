import React, { useEffect, useState } from 'react'
import { ClockIcon } from '@phosphor-icons/react'

const images = [
  "/assets/cartofi_condimentati.jpg",
  "/assets/pizza_casei.jpg",
  "/assets/pizza_ton.png",
  "/assets/spaghete_bolognese.jpg"
]

export default function MainSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='mt-10 flex justify-center items-center px-6 lg:px-24'>
      <div className='max-w-[1440px] w-full flex flex-col lg:flex-row justify-between items-center gap-5'>
        <div className='flex flex-col gap-8'>
          <div>
            <span className='text-custom-red font-bold text-2xl'>Bine ai venit la</span>
            <h1 className='text-5xl font-extrabold leading-tight'>
              Pizzeria Restaurant <br/> 
              si Bucura-te de <span className='text-custom-red'>delicii</span>
            </h1>
          </div>

          <p className='text-gray-700 text-lg leading-relaxed max-w-lg'>
            La Pizzeria Restaurant, pasiunea pentru gust autentic prinde viață în fiecare felie. Fie că vii pentru o pizza crocantă, o porție generoasă de paste sau doar pentru vibe-ul cald și prietenos, te așteptăm cu drag la o masă pe gustul tău.
          </p>
          <button className='w-fit bg-custom-red hover:bg-red-700 text-white font-semibold 
            py-4 px-8 text-lg rounded-xl transition-colors cursor-pointer shadow-md'
          >
            Comanda Online
          </button>

          <div className='flex items-center gap-4 text-md text-gray-700'>
            <ClockIcon 
              size={32} 
              color='red' 
              weight='regular'
              className='animate-pulse-scale'
            />
            
            <div className='text-base'>
              <p>Luni - Vineri: 10:30 - 21:00</p>
              <p>Weekend: 12:00 - 21:00</p>
            </div>
          </div>
        </div>

        <div className='w-full max-w-[750px] h-[480px] rounded-2xl overflow-hidden shadow-2xl relative'>
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
        </div>
      </div>
    </div>
  )
}
