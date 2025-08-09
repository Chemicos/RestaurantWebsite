import { Divider, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useEffect, useState } from 'react'

const topics = [
    {id: 'cum-comand', label: 'Cum comand'},
    {id: 'livrare', label: 'Detalii livrare'},
    {id: 'plata', label: 'Detalii plata'},
    {id: 'cookie', label: 'Politica de cookie'},
    {id: 'despre', label: 'Despre'}
]

export default function InfoNav({
    selectedTopic,
    onSelectTopic
}) {

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const handlePick = (id) => {
    onSelectTopic(id)
    setOpen(false)
  }

  useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
  }, [])
    
  return (
    <>
      <div className='md:hidden w-full flex items-center justify-between sticky top-20 z-20'>
        <IconButton
          aria-label='deschide meniul informatii'
          onClick={() => setOpen(true)}
          size='large'
        >
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{sx: {width: 280, backgroundColor: '#FEF7EA'}}}
      >
        <div className='p-4'>
          <h4 className='text-xl font-semibold mb-2'>Informatii</h4>
          <Divider />
        </div>
        <List>
          {topics.map(t => (
            <ListItemButton 
              key={t.id}
              selected={t.id === selectedTopic}
              onClick={() => handlePick(t.id)}
              sx={{
                '&.Mui-selected': {
                backgroundColor: '#ffd980',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fef2f2',
                }
              }}
            >
              <ListItemText 
                primary={t.label}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: t.id === selectedTopic ? 700 : 400,
                    color: t.id === selectedTopic ? '#E7272C' : '#66635B'
                  }
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <div className={`hidden md:flex flex-col sticky top-20 self-start h-fit gap-3 w-[200px] text-lg font-light border-r 
        border-[rgba(102,99,91,0.2)]
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
    </>
  )
}
