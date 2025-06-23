import {DotIcon, IconContext, ShoppingCartSimpleIcon, User} from "@phosphor-icons/react"
import logo from '../assets/logoPizzerie.png'
import { useState } from "react"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"

export default function Navigation() {
const [selected, setSelected] = useState("Acasa")
const [showLogin, setShowLogin] = useState(false)
const [showRegister, setShowRegister] = useState(false)

const cartItemCount = 0
const navItems = ["Acasa", "Meniuri", "Contact", "Informatii"]
  return (
    <div>
        <div className='flex p-4 justify-between items-center relative'>
            <img 
                src={logo} 
                alt="logo pizzerie" 
                className='h-16' 
            />

            <div className='flex gap-8'>
                {navItems.map(item => (
                    <button
                        key={item}
                        onClick={() => setSelected(item)}
                        className={`relative flex flex-col items-center text-lg cursor-pointer transition-opacity duration-200
                            hover:opacity-100
                          ${selected === item ? 'opacity-100 font-semibold' : 'opacity-50'}  
                        `}
                    >
                        {item}
                        {selected === item && (
                            <DotIcon 
                                size={20} 
                                weight="fill" 
                                className="absolute -bottom-4 animate-fade-in"
                            />
                        )}
                    </button>
                ))} 
            </div>

            <div className="flex gap-6">
                <div className="relative cursor-pointer">
                    <ShoppingCartSimpleIcon
                        size={30}
                        weight="bold"
                        className="text-[#66635B] hover:text-black transition-colors duration-200"
                    />
                    <span className="absolute -top-2 -right-2 bg-custom-yellow text-xs w-5 h-5 rounded-full flex items-center justify-center">
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
