import { Alert, Snackbar } from '@mui/material'
import React, { createContext, useState } from 'react'

export const SnackbarContext = createContext()

export default function SnackbarProvider({ children }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const triggerSnackbar = (message) => {
        setSnackbarMessage(message)
        setSnackbarOpen(true)
    }
  return (
    <SnackbarContext.Provider value={{triggerSnackbar}}>
        {children}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert 
                onClose={() => setSnackbarOpen(false)}
                severity='success'
                variant='filled'
                sx={{width: '100%'}}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
   </SnackbarContext.Provider>
  )
}
