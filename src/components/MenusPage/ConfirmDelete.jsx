/* eslint-disable no-unused-vars */
import { WarningCircleIcon } from '@phosphor-icons/react'
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
            className='fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] px-4 sm:px-0'>
            <motion.div 
                initial={{opacity: 0, scale: 0.85}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.2}}
                className='flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg max-w-sm w-full'
            >
                <div className='mb-4 p-2 border-4 border-red-50 bg-red-100 rounded-full'>
                    <WarningCircleIcon color='#FF0000' size={35} />
                </div>
                
                <div className='mb-8'>
                    <h2 className="text-xl font-semibold">Confirmare Ștergere</h2>
                    <p className="text-custom-gray text-sm leading-relaxed">Sigur vrei să ștergi <strong>{menuName}</strong> din comanda ta?</p>
                </div>

                <div className="flex justify-center gap-2 w-full">
                    <button
                        onClick={onCancel}
                        className="w-full px-4 py-2 text-custom-gray rounded hover:bg-gray-200 hover:text-black active:bg-gray-200 active:text-black cursor-pointer transition-all"
                    >
                        Anulează
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full px-4 py-2 bg-custom-red text-white rounded hover:bg-red-700 active:bg-red-700 active:scale-90 cursor-pointer transition-all"
                    >
                        Șterge
                    </button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}
