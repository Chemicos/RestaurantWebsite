import React from 'react'
import ProfileUserForm from './ProfileUserForm'
import ProfileSaveChanges from './ProfileSaveChanges'

export default function ProfilePage() {
  return (
    <div className='flex flex-col gap-6 max-w-[680px] px-8 lg:px-4 py-8 mx-auto'>
      <h1 className='text-2xl'>Editeaza Profil</h1>

      <ProfileUserForm />
      <ProfileSaveChanges />
    </div>
  )
}
