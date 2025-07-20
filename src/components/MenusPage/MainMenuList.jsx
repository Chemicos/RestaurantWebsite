import React, { useEffect, useState } from 'react'
import MenuCustomizer from '../MenuCustomizer/MenuCustomizer'

export default function MainMenuList() {
  const [menuItems, setMenuItems] = useState([])
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/menus`)
        const data = await res.json()
        setMenuItems(data)
      } catch (error) {
        console.error("Eroare la preluarea meniurilor", error)
      }
    }
    fetchMenus()
  }, [])

  const handleCustomize = (item) => {
    setSelectedItem(item)
    setIsCustomizing(true)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
      {menuItems.map(({id, name, price, image_url, ingredients}) => (
        <div
          key={id}
          className='flex gap-4 border-b border-dashed pb-4'
        >
          <img
            src={image_url}
            alt={name}
            className='w-36 h-36 object-cover rounded-md'
          />

          <div className='flex flex-col justify-between flex-1'>
            <div>
              <h3 className='text-lg font-semibold'>
                {name}
              </h3>
              <p className='text-xs sm:text-sm italic text-custom-gray'>
                {ingredients}
              </p>
            </div>

            <div className='flex justify-between items-center mt-2'>
              <button
                onClick={() => handleCustomize({id, name, price, image_url, ingredients})} 
                className='bg-custom-red text-white px-2 rounded text-2xl hover:bg-red-700
                cursor-pointer'
              >
              +
              </button>

              <p className='text-lg font-medium'>{price} RON</p>
            </div>
          </div>
        </div>
      ))}
  
      {isCustomizing && selectedItem && (
        <MenuCustomizer 
          onClose={() => setIsCustomizing(false)}
          menuId={selectedItem.id}
          imageUrl={selectedItem.image_url}
          name={selectedItem.name}
          price={selectedItem.price}
          ingredients={selectedItem.ingredients}
        />
      )}
    </div>
  )
}
