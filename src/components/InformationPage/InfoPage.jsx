import React, { useEffect, useState } from 'react'
import InfoNav from './InfoNav'
import InfoContent from './InfoContent'
import { useSearchParams } from 'react-router-dom'

export default function InfoPage() {
  const [selectedTopic, setSelectedTopic] = useState('cum-comand')

  const [searchParams, setSearchParams] = useSearchParams()
  const topicFromUrl = searchParams.get('topic') || 'cum-comand'

  useEffect(() => {
    setSelectedTopic(topicFromUrl)
  }, [topicFromUrl])

  const handleSelectTopic = (id) => {
    setSelectedTopic(id)
    setSearchParams({topic: id})
  }

  return (
    <div className='max-w-[1080px] mx-auto px-4 md:flex md:gap-10'>
      <InfoNav 
        selectedTopic={selectedTopic} 
        onSelectTopic={handleSelectTopic} 
      />
      <div className='flex-1'>
        <InfoContent 
          selectedTopic={selectedTopic}
        />
      </div>
    </div>
  )
}
