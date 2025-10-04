import React, { useState } from 'react'

import {
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Typography
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import pas1 from '/assets/pasiComanda/pas1.jpeg'
import pas2 from '/assets/pasiComanda/pas2.jpeg'
import pas3 from '/assets/pasiComanda/pas3.jpeg'
import { useTranslation } from 'react-i18next'

export default function CumComand() {
    const {t} = useTranslation()
    const [expandedPanels, setExpandedPanels] = useState(['pas1'])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedPanels(prev => {
            if (isExpanded) {
                return [...prev, panel]
            } else {
                return prev.filter(p => p !== panel)
            }
        })
    }

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
                <img src={pas1} alt="Pasul 1" className='mt-3 shadow-lg rounded-lg mx-auto sm:h-[300px] lg:h-[400px]' />
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
                <img src={pas2} alt="Pasul 2" className='mt-3 shadow-lg rounded-lg mx-auto sm:h-[300px] lg:h-[400px]' />
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
                <img src={pas3} alt="Pasul 3" className='mt-3 shadow-lg rounded-lg mx-auto sm:h-[300px] lg:h-[400px]' />
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
                    {t('howToOrder.online.step4.desc4')}. 
                </p>
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
    </div>
  )
}
