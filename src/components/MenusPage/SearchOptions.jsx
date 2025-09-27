import { PizzaIcon, BowlFoodIcon, CookieIcon, MagnifyingGlassIcon, FunnelSimpleIcon } from "@phosphor-icons/react"
import { Box, createTheme, Divider, Drawer, Fab, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider, useMediaQuery } from '@mui/material'
import { useState } from "react"

const filterOptions = [
  { value: 'Pizza', label: 'Pizza', icon: <PizzaIcon size={20} /> },
  { value: 'Paste', label: 'Paste', icon: <BowlFoodIcon size={20} /> },
  { value: 'Desert', label: 'Desert', icon: <CookieIcon size={20} /> },
  { value: 'Altele', label: 'Altele'}
]

const theme = createTheme({
  breakpoints: {
    values: {
      md: 1024
    }
  }
})
export default function SearchOptions({ 
  selectedCategory, 
  setSelectedCategory, 
  countOfMenus,
  searchTerm,
  setSearchTerm,
  onResetFilters
}) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  const getFilterInputs = (isMobile) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-end',
        gap: 3,
        width: '100%',
      }}
    >
      <FormControl
        size='small'
        fullWidth={isMobile}
        sx={{
          width: isMobile ? '100%' : 200,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#000',
          },
        }}
      >
        <InputLabel id='filter-label'>Categorie</InputLabel>
        <Select
          labelId='filter-label'
          id='category-select'
          value={selectedCategory}
          label='Categorie'
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            if (isMobile) setOpenDrawer(false)
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#f9f9f9',
                paddingX: '10px'
              },
            },
          }}
        >
          <MenuItem value="" sx={{
            borderRadius: '10px',
            paddingX: '10px',
            marginBottom: '5px',
            '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#FFE2E2', borderRadius: '10px' } 
            }}
          >
            <em>Toate</em>
          </MenuItem>
          {filterOptions.map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              sx={{ 
                borderRadius: '10px', 
                paddingX: '10px',
                marginBottom: '5px',
                '&.Mui-selected, &.Mui-selected:hover': { 
                  backgroundColor: '#FFE2E2',
                  borderRadius: '10px',
                } 
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontStyle: 'italic' }}>
                {opt.icon}
                {opt.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', width: isMobile ? '100%' : 'auto' }}>
        <MagnifyingGlassIcon size={22} style={{ marginRight: 8, marginBottom: 4 }} />
        <TextField
          variant='standard'
          label='Caută'
          fullWidth={isMobile}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiInput-underline:after': {
              borderBottomColor: '#000',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000',
            },
          }}
        />
      </Box>

      <button
        onClick={() => {
          onResetFilters()
          if (isMobile) setOpenDrawer(false)
        }}
        className={`hover:bg-red-600 hover:border-red-600 active:scale-90 active:bg-red-600 active:border-red-600 active:text-white text-custom-gray hover:text-white 
          text-md border border-custom-gray px-3 py-2 rounded transition-all cursor-pointer ${
          isMobile ? 'w-full' : ''
        }`}
      >
        Resetează
      </button>
    </Box>
  )

  

  return (
    <>
      <ThemeProvider theme={theme}>
        {!isMobile && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <Box sx={{
              display: 'flex',
              gap: 4,
              alignItems: 'flex-end',
            }}>
              {getFilterInputs(false)}
            </Box>
            <span className="hidden md:block" style={{ fontSize: 14, fontWeight: 500, color: '#66635B' }}>
              {countOfMenus} Meniuri
            </span>
          </Box>
        )}


        {isMobile && (
          <>
            <Fab
              color='default'
              aria-label='filtrare meniuri'
              onClick={() => setOpenDrawer(true)}
              sx={{
                position: 'fixed',
                left: 16,
                bottom: 'calc(16px + env(safe-area-inset-bottom))',
                zIndex: 40,
                backgroundColor: '#ffd980',
                boxShadow: 3,
                '&:hover': { backgroundColor: '#ffd980' }
              }}
            >
              <FunnelSimpleIcon size={30} />
            </Fab>

            <Drawer
              anchor='left'
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              PaperProps={{ sx: { width: 280, backgroundColor: '#FEF7EA', zIndex: 1300} }}
            >
              <h4 className='text-xl font-semibold p-4 mb-2'>Filtrare meniuri</h4>

              <Divider />

              <Box sx={{ p: 3 }}>  
                {getFilterInputs(true)}
              </Box>
            </Drawer>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#66635B' }}>
              {countOfMenus} Meniuri
            </span>
          </>
        )}
      </ThemeProvider>
    </>
  )
}
