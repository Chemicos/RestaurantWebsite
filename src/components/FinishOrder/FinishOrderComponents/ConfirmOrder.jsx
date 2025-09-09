import React, { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'

export default function ConfirmOrder({
    open,
    onClose,
    onOk,
    title = 'Plata a fost efectuată!',
    message = 'Iti multumim. Te vom contacta in curand.',
    okText = 'Inchide'
}) {

    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === 'Escape' && onClose?.()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])

    useEffect(() => {
        if (!open) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {document.body.style.overflow = prev}
    }, [open])

  return (
    <AnimatePresence>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] px-4 sm:px-0'
        >
            <motion.div
                initial={{opacity: 0, scale: 0.85}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.2}}
                className='flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg max-w-sm w-full'
            >
                <motion.svg
                    width='96' height='96' viewBox='0 0 96 96'
                    initial='hidden'
                    animate='visible'
                >
                    <motion.circle
                        cx='48' cy='48' r='40' fill='none'
                        strokeWidth='6'
                        className='text-green-500'
                        variants={{
                            hidden: {pathLength: 0, opacity: 0},
                            visible: {
                                pathLength: 1, opacity: 1,
                                transition: {duration: 0.6, ease: 'easeInOut'}
                            }
                        }}
                    />
                    <motion.path
                        d='M30 50 L44 62 L68 36'
                        fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                        stroke="currentColor"
                        className="text-green-500"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: {
                                pathLength: 1, opacity: 1,
                                transition: { delay: 0.2, duration: 0.2, ease: 'easeInOut' }
                            }
                        }}
                    />
                </motion.svg>

                <motion.h3
                    className='text-xl font-semibold mb-2'
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    {title}
                </motion.h3>

                <motion.p
                className='text-sm text-[#66635B] mb-4'
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22 }}
                >
                {message}
                </motion.p>

                <motion.button
                    onClick={() => {
                        onOk?.()
                        onClose?.()
                    }}
                    className='mt-2 bg-custom-red hover:bg-red-700 active:bg-red-700 active:scale-95 text-white py-2 px-4 w-full rounded-lg font-semibold transition-all'
                    autoFocus
                >
                {okText}
                </motion.button>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}
