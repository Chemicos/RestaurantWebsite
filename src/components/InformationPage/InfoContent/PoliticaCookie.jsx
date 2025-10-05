import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PoliticaCookie() {
    const {t} = useTranslation()
  return (
    <div className='prose max-w-none'>
        <h1 className='text-3xl font-semibold'>{t('cookiePolicy.title')}</h1>

        <p className='text-custom-gray mt-2'>{t('cookiePolicy.intro')}</p>

        <h2 className='text-xl mt-4'>{t('cookiePolicy.whatAreCookiesTitle')}</h2>
        <p className='text-custom-gray mt-2'>{t('cookiePolicy.whatAreCookiesText')}</p>

        <h2 className='text-xl mt-4'>{t('cookiePolicy.howWeUseTitle')}</h2>
        <p className='text-custom-gray mt-2'>
            {t('cookiePolicy.howWeUseText')}
        </p>

        <h2 className='text-xl mt-4'>{t('cookiePolicy.typesTitle')}</h2>
        <p className='text-custom-gray mt-2'>
            {t('cookiePolicy.typesText')}
        </p>

        <h2 className='text-xl mt-4'>{t('cookiePolicy.controlTitle')}</h2>
        <p className='text-custom-gray mt-2'>
            {t('cookiePolicy.controlText')}
        </p>

        <h2 className='text-xl mt-4'>{t('cookiePolicy.amendmentsTitle')}</h2>
        <p className='text-custom-gray mt-2'>
            {t('cookiePolicy.amendmentsText')}
        </p>
    </div>
  )
}
