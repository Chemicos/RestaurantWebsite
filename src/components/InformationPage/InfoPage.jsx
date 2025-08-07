import React, { useState } from 'react'
import InfoNav from './InfoNav'
import InfoContent from './InfoContent'

export default function InfoPage() {
  const [selectedTopic, setSelectedTopic] = useState('cum-comand')

  return (
    <div className='flex max-w-[1280px] mx-auto px-4 gap-10'>
      <InfoNav 
        selectedTopic={selectedTopic} 
        onSelectTopic={setSelectedTopic} 
      />
      <InfoContent 
        selectedTopic={selectedTopic}
      />
    </div>
  )
}
