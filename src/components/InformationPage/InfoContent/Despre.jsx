import { useTranslation } from "react-i18next"

export default function Despre() {
    const {t} = useTranslation()
    const differenceList = t('aboutPage.differenceList', {returnObjects: true})
    return (
        <div className="prose max-w-none">
            <h1 className='text-3xl font-semibold'>{t('aboutPage.title')}</h1>
            <h2 className='text-xl mt-4'>{t('aboutPage.historyTitle')}</h2>

            <p className='text-custom-gray mt-2'>{t('aboutPage.historyText')}</p>

            <h2 className='text-xl mt-4'>{t('aboutPage.differenceTitle')}</h2>
            <ul className="pl-6 list-disc text-custom-gray font-bold">
                {differenceList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <h2 className='text-xl mt-4'>{t('aboutPage.missionTitle')}</h2>
            <p className='text-custom-gray mt-2'>{t('aboutPage.missionText')}</p>
        </div>
    )
}