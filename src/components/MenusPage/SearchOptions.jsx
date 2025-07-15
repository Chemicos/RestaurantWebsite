import React, { useState } from 'react'
import { PizzaIcon, BowlFoodIcon, CookieIcon, MartiniIcon } from "@phosphor-icons/react"
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'


const filterOptions = [
  { value: 'Pizza', label: 'Pizza', icon: <PizzaIcon size={20} /> },
  { value: 'Paste', label: 'Paste', icon: <BowlFoodIcon size={20} /> },
  { value: 'Desert', label: 'Desert', icon: <CookieIcon size={20} /> },
  { value: 'Bauturi', label: 'Bauturi', icon: <MartiniIcon size={20} /> },
  { value: 'Altele', label: 'Altele'}
]
export default function SearchOptions({ selectedCategory, setSelectedCategory }) {
  const [category, setCategory] = useState(selectedCategory || '')

  const handleChange = (event) => {
    setCategory(event.target.value)
    setSelectedCategory(event.target.value)
  }

  return (
    <Box sx={{minWidth: 200}}>
      <FormControl fullWidth size='small'>
        <InputLabel id='filter-label'>Categorie</InputLabel>
        <Select
          labelId='filter-label'
          id='category-select'
          value={category}
          label='Categorie'
          onChange={handleChange}
        >
          {filterOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                {opt.icon}
                {opt.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
