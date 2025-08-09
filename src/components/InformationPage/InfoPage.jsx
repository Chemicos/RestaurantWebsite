import React, { useState } from 'react'
import InfoNav from './InfoNav'
import InfoContent from './InfoContent'

export default function InfoPage() {
  const [selectedTopic, setSelectedTopic] = useState('cum-comand')

  return (
    <div className='max-w-[1080px] mx-auto px-4 md:flex md:gap-10'>
      <InfoNav 
        selectedTopic={selectedTopic} 
        onSelectTopic={setSelectedTopic} 
      />
      <div className='flex-1'>
        <InfoContent 
          selectedTopic={selectedTopic}
        />
      </div>
    </div>
  )
}
