import React, { useEffect, useState } from 'react'
import {
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import pas1_ro_desk from '/assets/pasiComanda/pas1_ro_desk.jpeg'
import pas2_ro_desk from '/assets/pasiComanda/pas2_ro_desk.jpeg'
import pas3_ro_desk from '/assets/pasiComanda/pas3_ro_desk.jpeg'
import pas4_ro_desk from '/assets/pasiComanda/pas4_ro_desk.jpeg'

import pas1_en_desk from '/assets/pasiComanda/pas1_en_desk.jpeg'
import pas2_en_desk from '/assets/pasiComanda/pas2_en_desk.jpeg'
import pas3_en_desk from '/assets/pasiComanda/pas3_en_desk.jpeg'
import pas4_en_desk from '/assets/pasiComanda/pas4_en_desk.jpeg'

export default function CumComand() {
    const {t, i18n} = useTranslation()
    const [expandedPanels, setExpandedPanels] = useState(['pas1'])
    const [modalOpen, setModalOpen] = useState(false)
    const [activeImage, setActiveImage] = useState(null)
    const imagesStyle = 'my-8 shadow-lg hover:shadow-xl rounded-lg mx-auto sm:h-[300px] lg:h-[400px] transition-all duration-200 hover:scale-105 cursor-pointer'

    const images = {
        pas1: i18n.language === 'ro' ? pas1_ro_desk : pas1_en_desk,
        pas2: i18n.language === 'ro' ? pas2_ro_desk : pas2_en_desk,
        pas3: i18n.language === 'ro' ? pas3_ro_desk : pas3_en_desk,
        pas4: i18n.language === 'ro' ? pas4_ro_desk : pas4_en_desk
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedPanels(prev => {
            if (isExpanded) {
                return [...prev, panel]
            } else {
                return prev.filter(p => p !== panel)
            }
        })
    }

    const handleImageClick = (image) => {
        setActiveImage(image)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setActiveImage(null)
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [modalOpen])

    const isExpanded = (panel) => expandedPanels.includes(panel)
  return (
    <div className='prose max-w-none'>
        <h1 className='text-3xl font-semibold'>{t('howToOrder.title')}</h1>

        <h2 className='text-xl mt-4'>{t('howToOrder.subtitle')}</h2>

        <h3 className='text-xl mt-4'>{t('howToOrder.online.title')}</h3> 
        <p className='text-custom-gray mt-2'>{t('howToOrder.online.desc')} <span className='font-bold text-custom-red'>{t('howToOrder.online.descExtra')}</span>:</p>

        <Accordion 
            expanded={isExpanded('pas1')}
            onChange={handleChange('pas1')}
            elevation={0} 
            disableGutters
             sx={{
                backgroundColor: 'transparent',
                '&:before': {
                display: isExpanded('pas1') ? 'none' : 'block'
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold', fontSize: '20px'}}>
                    {t('howToOrder.online.step1.title')}:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    {t('howToOrder.online.step1.desc')} <span className='font-semibold'>{t('howToOrder.online.step1.descExtra')}</span>.
                </p>
                <img 
                    src={images.pas1} 
                    alt="Pasul 1" 
                    onClick={() => handleImageClick(images.pas1)}
                    className={imagesStyle} 
                />
            </AccordionDetails>
        </Accordion>

        <Accordion 
            expanded={isExpanded('pas2')} 
            onChange={handleChange('pas2')} 
            elevation={0} 
            disableGutters
             sx={{
                backgroundColor: 'transparent',
                '&:before': {
                display: isExpanded('pas2') ? 'none' : 'block'
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold', fontSize: '20px'}}>
                    {t('howToOrder.online.step2.title')}:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    {t('howToOrder.online.step2.desc')} <span className='font-semibold'>{t('howToOrder.online.step2.descExtra')}</span>.
                </p>
                <img 
                    src={images.pas2} 
                    alt="Pasul 2" 
                    onClick={() => handleImageClick(images.pas2)}
                    className={imagesStyle}
                />
            </AccordionDetails>
        </Accordion>

        <Accordion 
            expanded={isExpanded('pas3')} 
            onChange={handleChange('pas3')}
            elevation={0} 
            disableGutters
             sx={{
                backgroundColor: 'transparent',
                '&:before': {
                display: isExpanded('pas3') ? 'none' : 'block'
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold', fontSize: '20px'}}>
                    Pasul 3:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    {t('howToOrder.online.step3.desc1')}
                    <span className='font-semibold'> {t('howToOrder.online.step3.descExtra1')} </span>
                     {t('howToOrder.online.step3.desc2')}
                    <span className='font-bold'> {t('howToOrder.online.step3.descExtra2')}</span>.
                </p>
                <img 
                    src={images.pas3} 
                    alt="Pasul 3" 
                    onClick={() => handleImageClick(images.pas3)}
                    className={imagesStyle} 
                />
            </AccordionDetails>
        </Accordion>

        <Accordion 
            expanded={isExpanded('pas4')} 
            onChange={handleChange('pas4')} 
            elevation={0} 
            disableGutters
             sx={{
                backgroundColor: 'transparent',
                '&:before': {
                display: isExpanded('pas4') ? 'none' : 'block'
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold', fontSize: '20px'}}>
                    {t('howToOrder.online.step4.title')}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    {t('howToOrder.online.step4.desc1')}
                    <span className='font-semibold'> {t('howToOrder.online.step4.descExtra1')}
                    </span> {t('howToOrder.online.step4.desc2')} <span className='font-bold'>{t('howToOrder.online.step4.descExtra2')}</span> {t('howToOrder.online.step4.desc3')} 
                    <span className='font-bold'> {t('howToOrder.online.step4.descExtra3')} </span> 
                    {t('howToOrder.online.step4.desc4')}<span className='font-bold'> {t('howToOrder.online.step4.descExtra4')}</span>. 
                </p>
                <img 
                    src={images.pas4} 
                    alt="Pasul 4"
                    onClick={() => handleImageClick(images.pas4)}
                    className={imagesStyle} 
                />
            </AccordionDetails>
        </Accordion>

        <h3 className='text-xl mt-4 mb-4'>{t('howToOrder.phone.title')}</h3> 

        <Accordion 
            expanded={isExpanded('telefon')} 
            onChange={handleChange('telefon')}
            elevation={0} 
            disableGutters
             sx={{
                backgroundColor: 'transparent',
                '&:before': {
                display: isExpanded('telefon') ? 'none' : 'block'
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#66635B'}}>
                    {t('howToOrder.phone.summary')}
                    <span className='font-bold'> 07284948491</span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul className='list-disc list-inside text-custom-gray'>
                    {t('howToOrder.phone.steps', {returnObjects: true}).map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                </ul>
            </AccordionDetails>
        </Accordion>

        <AnimatePresence>
            {modalOpen && activeImage && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    onClick={closeModal}
                    className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'
                >
                    <img 
                        src={activeImage} 
                        alt="zoomed image" 
                        className='max-w-[80vw] max-h-[80vh] rounded-xl' 
                    />
                </motion.div>
            )}
        </AnimatePresence>
        
    </div>
  )
}
