import React, { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function ConfirmMessage({
    open, onClose, onOk
}) {
    const {t} = useTranslation()

    const title = t('contactUs.confirmMessage.title')
    const message = t('contactUs.confirmMessage.message')
    const okText = t('contactUs.confirmMessage.okText')
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

    const letterVariants = {
        hidden: { y: 18, opacity: 0 },
        show: {
        y: [18, 8, -2],
        opacity: [0, 1, 1],
        transition: { duration: 0.9, times: [0, 0.5, 1], ease: "easeOut" },
        },
    }

    const flapVariants = {
        hidden: { rotateX: 0 },
        show: {
        rotateX: [0, 160, 160],
        transition: { duration: 0.7, times: [0, 0.6, 1], ease: "easeInOut" },
        },
    }

    const envVariants = {
        hidden: { y: 0 },
        show: {
        y: [-2, 0, -6, 0],
        transition: { duration: 0.9, times: [0, 0.25, 0.55, 1], ease: "easeInOut" },
        },
    }

  return (
    <AnimatePresence>
        {open && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] px-4 sm:px-0"
                aria-modal="true"
                role="dialog"
                >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg max-w-sm w-full"
                >
                    <motion.svg
                    width="120"
                    height="96"
                    viewBox="0 0 120 96"
                    className="mb-2"
                    initial="hidden"
                    animate="show"
                    >
                    <motion.g variants={envVariants}>
                        <rect x="20" y="28" width="80" height="44" rx="6" fill="#FFE1B5" />
                        <path d="M20 30 L60 55 L100 30" fill="#FFC98A" />
                        <motion.rect
                        variants={letterVariants}
                        x="30"
                        y="32"
                        width="60"
                        height="30"
                        rx="4"
                        fill="#ffffff"
                        stroke="#e6e6e6"
                        />
                        <motion.path
                            variants={flapVariants}
                            style={{ transformOrigin: "60px 30px" }}
                            d="M20 30 L60 10 L100 30 L60 50 Z"
                            fill="#FFD08F"
                        />
                    </motion.g>
                    <motion.path
                        d="M46 76 L56 86 L76 66"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.75, duration: 0.35, ease: "easeInOut" }}
                    />
                    </motion.svg>

                    <motion.h3
                        className="text-xl font-semibold mb-2"
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                    >
                    {title}
                    </motion.h3>

                    <motion.p
                        className="text-sm text-[#66635B] mb-4"
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.22 }}
                    >
                    {message}
                    </motion.p>

                    <motion.button
                        onClick={() => {
                            onOk?.();
                            onClose?.();
                        }}
                        className="mt-2 bg-custom-red hover:bg-red-700 active:bg-red-700 active:scale-95 text-white py-2 px-4 w-full rounded-lg font-semibold transition-all"
                        autoFocus
                    >
                    {okText}
                    </motion.button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}
