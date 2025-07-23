import {DotIcon, IconContext, ShoppingCartSimpleIcon, User} from "@phosphor-icons/react"
// import logo from '../assets/logoPizzerie.png'
import { useEffect, useState } from "react"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { NavLink } from "react-router-dom"

const navItems = [
    {name: 'Acasa', path: '/'},
    {name: 'Meniuri', path: '/meniuri'},
    {name: 'Contact', path: '/contact'},
    {name: 'Informatii', path: '/informatii'}
]

export default function Navigation() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [hasShadow, setHasShadow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

const cartItemCount = 0
  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasShadow ? 'shadow-lg bg-custom-yellow' : ''}`}>
        <div className='flex p-4 justify-between items-center'>
            <img 
                src={`/assets/logoPizzerie.png`} 
                alt="logo pizzerie" 
                className='h-16' 
            />

            <div className='flex gap-8'>
                 {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) => `
                relative flex flex-col items-center text-lg cursor-pointer transition-opacity duration-200
                ${isActive ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-100"}
              `}
            >
            {({ isActive }) => (
                <>
                    {name}
                    {isActive && (
                    <DotIcon
                        size={20}
                        weight="fill"
                        className="absolute -bottom-4 animate-fade-in"
                    />
                    )}
                </>
            )}
            </NavLink>
          ))}
            </div>

            <div className="flex gap-6">
                <div className="relative cursor-pointer">
                    <ShoppingCartSimpleIcon
                        size={30}
                        weight="bold"
                        className="text-[#66635B] hover:text-black transition-colors duration-200"
                    />
                    <span className="absolute -top-2 -right-2 bg-custom-red text-xs text-white w-5 h-5 rounded-full flex items-center justify-center">
                        {cartItemCount}
                    </span>
                </div>
                <User 
                    size={30}
                    weight="bold"
                    onClick={() => setShowLogin(prev => !prev)}
                    className="text-[#66635B] hover:text-black transition-colors duration-200 cursor-pointer"
                />
                {showLogin && (
                    showRegister ? (
                        <Register 
                            setShowRegister={setShowRegister} 
                            onClose={() => {
                                setShowLogin(false)
                                setShowRegister(false)
                            }}
                        />    
                    ) : (
                        <Login 
                            setShowRegister={setShowRegister}
                            onClose={() => setShowLogin(false)}
                        />
                    )
                )}
            </div>     
        </div>
    </div>
  )
}
