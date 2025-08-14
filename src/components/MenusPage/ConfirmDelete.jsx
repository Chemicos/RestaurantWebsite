/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function ConfirmDelete({visible, onCancel, onConfirm, menuName}) {
    if(!visible) return null
  return (
    <AnimatePresence>
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]'>
            <motion.div 
                initial={{opacity: 0, scale: 0.85}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.2}}
                className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
                <h2 className="text-xl font-semibold mb-4">Confirmare Ștergere</h2>
                <p className="mb-6">Sigur vrei să ștergi <strong>{menuName}</strong> din comanda ta?</p>

                <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-custom-gray rounded hover:bg-gray-200 hover:text-black active:bg-gray-200 active:text-black cursor-pointer transition-all"
                >
                    Anulează
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-custom-red text-white rounded hover:bg-red-700 active:bg-red-700 active:scale-90 cursor-pointer transition-all"
                >
                    Șterge
                </button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}
