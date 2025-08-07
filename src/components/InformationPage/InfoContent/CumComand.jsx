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

export default function CumComand() {
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
        <h1 className='text-3xl font-semibold'>Cum Comand</h1>

        <h2 className='text-xl mt-4'>Cum comanzi online/telefonic de la Pizzeria Clinceni</h2>

        <h3 className='text-xl mt-4'>1. Comanda Online</h3> 
        <p className='text-custom-gray mt-2'>Pizzeria Clinceni iti ofera posibilitatea de a comanda rapid si simplu direct de pe site-ul nostru. Iata pasii pentru a plasa o comanda online:</p>

        <Accordion 
            expanded={isExpanded('pas1')}
            onChange={handleChange('pas1')}
            elevation={0} 
            sx={{backgroundColor: 'transparent'}}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold'}}>
                    Pasul 1:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    Alege produsul preferat din pagina de <span className='font-semibold'>Meniuri</span>.
                </p>
                <img src={pas1} alt="Pasul 1" className='mt-3 shadow-lg rounded-lg' />
            </AccordionDetails>
        </Accordion>

        <Accordion 
            expanded={isExpanded('pas2')} 
            onChange={handleChange('pas2')} 
            elevation={0} 
            sx={{backgroundColor: 'transparent'}}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold'}}>
                    Pasul 2:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    Personalizeaza-ti produsul si apoi mergi la butonul <span className='font-semibold'>Adauga</span>.
                </p>
                <img src={pas2} alt="Pasul 2" className='mt-3 shadow-lg rounded-lg' />
            </AccordionDetails>
        </Accordion>

        <Accordion 
            expanded={isExpanded('pas3')} 
            onChange={handleChange('pas3')}
            elevation={0} 
            sx={{backgroundColor: 'transparent'}}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold'}}>
                    Pasul 3:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    Dupa adaugarea meniurilor mergi in partea dreapta, spre sectiunea 
                    <span className='font-semibold'> Comanda ta </span>
                     si apesi butonul 
                    <span className='font-bold'> Finalizeaza</span>.
                </p>
                <img src={pas3} alt="Pasul 3" className='mt-3 shadow-lg rounded-lg' />
            </AccordionDetails>
        </Accordion>

        <Accordion 
            expanded={isExpanded('pas4')} 
            onChange={handleChange('pas4')} 
            elevation={0} 
            sx={{backgroundColor: 'transparent'}}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#E7272C', fontWeight: 'bold'}}>
                    Pasul 4:
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p className='text-custom-gray'>
                    In sectiunea de 
                    <span className='font-semibold'> Finalizare Comanda
                    </span> completezi campurile din <span className='font-bold'>Date personale</span> (doar in cazul in care nu esti autentificat), 
                    <span className='font-bold'> Adresa de livrare </span> 
                    si selectezi metoda de livrare si cea de plata. 
                </p>
            </AccordionDetails>
        </Accordion>

        <h3 className='text-xl mt-4 mb-4'>2. Comanda Telefonica</h3> 

        <Accordion 
            expanded={isExpanded('telefon')} 
            onChange={handleChange('telefon')}
            elevation={0} 
            sx={{backgroundColor: 'transparent'}}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!p-0'>
                <Typography sx={{color: '#66635B'}}>
                    Daca preferi sa comanzi prin telefon, ne poti suna la {' '}
                    <span className='font-bold'>07284948491</span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul className='list-disc list-inside text-custom-gray'>
                    <li>Spune-ne numele, adresa de livrare si produsele dorite.</li>
                    <li>Alegi metoda de plata preferata.</li>
                    <li>Echipa noastra confirma comanda si estimarea timpului de livrare.</li>
                    <li>Astepti comanda delicioasa direct la usa ta.</li>
                </ul>
            </AccordionDetails>
        </Accordion>
    </div>
  )
}
