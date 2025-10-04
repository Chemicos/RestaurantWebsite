/* eslint-disable no-unused-vars */
import { WarningCircleIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function ConfirmDelete({visible, onCancel, onConfirm, menuName}) {    
    const {t} = useTranslation()

    useEffect(() => {
        if (!visible) return
        const onKey = (e) => e.key === 'Escape' && onCancel?.()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [visible, onCancel])

    useEffect(() => {
        if (!visible) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {document.body.style.overflow = prev}
    }, [visible])
    
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
                    <motion.h2 
                        className="text-xl font-semibold"
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                    >
                        {t('confirmDelete.title')}
                    </motion.h2>
                    <motion.p 
                        className="text-custom-gray text-sm leading-relaxed"
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.22 }}
                    >
                        {t('confirmDelete.message1')} <strong>{menuName}</strong> {t('confirmDelete.message2')}
                    </motion.p>
                </div>

                <div className="flex justify-center gap-2 w-full">
                    <button
                        onClick={onCancel}
                        className="w-full px-4 py-2 text-custom-gray rounded-lg hover:bg-gray-200 hover:text-black active:bg-gray-200 active:text-black cursor-pointer transition-all"
                    >
                        {t('confirmDelete.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full px-4 py-2 bg-custom-red text-white rounded-lg hover:bg-red-700 active:bg-red-700 active:scale-90 cursor-pointer transition-all"
                    >
                        {t('confirmDelete.delete')}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}
