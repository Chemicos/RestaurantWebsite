import { PizzaIcon, BowlFoodIcon, CookieIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const filterOptions = [
  { value: 'Pizza', label: 'Pizza', icon: <PizzaIcon size={20} /> },
  { value: 'Paste', label: 'Paste', icon: <BowlFoodIcon size={20} /> },
  { value: 'Desert', label: 'Desert', icon: <CookieIcon size={20} /> },
  { value: 'Altele', label: 'Altele'}
]
export default function SearchOptions({ 
  selectedCategory, 
  setSelectedCategory, 
  countOfMenus,
  searchTerm,
  setSearchTerm,
  onResetFilters
}) {

  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 4, 
        alignItems: 'flex-end',
        flexDirection: {xs: 'column', sm: 'row'}
      }}>
        <FormControl size='small' sx={{
            width: { xs: "100%", sm: 200}, 
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#000',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#000',
            }
          }}
        >
          <InputLabel id='filter-label'>Categorie</InputLabel>
          <Select
            labelId='filter-label'
            id='category-select'
            value={selectedCategory}
            label='Categorie'
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#f9f9f9'
                }
              }
            }}
            >
            <MenuItem value="" sx={{ 
                  '&.Mui-selected': {
                    backgroundColor: '#FFE2E2',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#FFE2E2',
                  }
              }}
            > 
              <em>Toate</em>  
            </MenuItem>

            {filterOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value} 
                sx={{ 
                  '&.Mui-selected': {
                    backgroundColor: '#FFE2E2',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#FFE2E2',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontStyle: 'italic'}}>
                  {opt.icon}
                  {opt.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
          <MagnifyingGlassIcon size={22} style={{marginRight: 8, marginBottom: 4}} />

          <TextField
            variant='standard'
            label='Cauta'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: {xs: '100%', sm: 200},
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
          onClick={onResetFilters}
          className='hover:bg-red-600 hover:border-red-600 active:scale-90 text-custom-gray hover:text-white text-md border border-custom-gray px-3 py-2 rounded transition-all cursor-pointer'
        >
          Reseteaza
        </button>
      </Box>
      

      <span style={{fontSize: 14, fontWeight: 500, color: '#66635B'}}>
        {countOfMenus} Meniuri
      </span>
    </Box>
  )
}
