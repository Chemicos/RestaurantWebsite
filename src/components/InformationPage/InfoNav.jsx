import React, { useEffect, useState } from 'react'

const topics = [
    {id: 'cum-comand', label: 'Cum comand'},
    {id: 'livrare', label: 'Detalii livrare'},
    {id: 'plata', label: 'Detalii plata'},
    {id: 'cookie', label: 'Politica de cookie'},
    {id: 'retur', label: 'Politica de retur'},
    {id: 'despre', label: 'Despre'}
]

export default function InfoNav({
    selectedTopic,
    onSelectTopic
}) {

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 10)
        }
    
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [])
    
  return (
    <div className={`sticky top-20 self-start h-fit flex flex-col gap-3 w-[200px] text-lg font-light border-r border-[rgba(102,99,91,0.2)]
        ${scrolled ? 'translate-y-[40px]' : 'translate-y-0'} translate-all duration-300
    `}>
      {topics.map(topic => (
        <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className={`text-left transition-all cursor-pointer hover:text-black
            ${selectedTopic === topic.id ? 'text-custom-red font-bold' : 'text-custom-gray'}`}
        >
            {topic.label}
        </button>
      ))}
    </div>
  )
}
