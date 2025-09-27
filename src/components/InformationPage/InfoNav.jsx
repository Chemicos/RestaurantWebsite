import { createTheme, Divider, Drawer, Fab, IconButton, List, ListItemButton, ListItemText, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ChevronLeft } from '@mui/icons-material'

const topics = [
    {id: 'cum-comand', label: 'Cum comand'},
    {id: 'livrare', label: 'Detalii livrare'},
    {id: 'plata', label: 'Detalii plată'},
    {id: 'cookie', label: 'Politica de cookie'},
    {id: 'despre', label: 'Despre'}
]

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 768
    }
  }
})

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
    <ThemeProvider theme={theme}>
      {!open && (
        <Fab 
          color='default'
          aria-label='meniul informatii'
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            left: 16,
            bottom: `calc(16px + env(safe-area-inset-bottom))`,
            zIndex: 40,
            backgroundColor: '#ffd980',
            boxShadow: 3,
            display: {xs: 'block', sm: 'none'},
            '&:hover': {
              backgroundColor: '#ffd980'
            }
          }}
        >
          <ChevronLeft />
        </Fab>  
      )}
    </ThemeProvider>

      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{sx: {width: 280, backgroundColor: '#FEF7EA'}}}
      >
        <h4 className='text-xl font-semibold mb-2 p-4'>Informatii</h4>
        <Divider />
        <List>
          {topics.map(t => (
            <ListItemButton 
              key={t.id}
              selected={t.id === selectedTopic}
              onClick={() => handlePick(t.id)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'transparent',
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
