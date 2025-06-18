import HeroSection from './hero-section'
import ExhibitionImageGallery from './exhibition-image-gallery'
import BlockContent from './block-content'
import ResidencyForm from './forms/ResidencyForm'
import { useLanguage } from './language-provider'

interface ResidenciasPageProps {
  title: string
  subtitle?: string
  mainImage: { url: string; alt?: string }
  gallery?: any[]
  description?: any
  locale: string
}

export default function ResidenciasPage({
  title,
  subtitle,
  mainImage,
  gallery,
  description,
  locale,
}: ResidenciasPageProps) {
  const t = {
    es: {
      descripcion: 'Descripción',
      galeria: 'Galería',
      formulario: 'Formulario de Postulación',
    },
    en: {
      descripcion: 'Description',
      galeria: 'Gallery',
      formulario: 'Application Form',
    },
  }[locale === 'en' ? 'en' : 'es']

  const heroData = {
    mainImage: mainImage || { url: '/placeholder.svg', alt: 'Residencia' },
    title,
    subtitle,
  }

  return (
    <div>
      {/* Hero Section (mainImage, title, subtitle) */}
      <HeroSection exhibition={heroData} />

      {/* Main Content Area (igual que exposiciones) */}
      <div className='container mx-auto px-4 py-12'>
        {/* Description Section */}
        {description && (
          <div className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>
              {t.descripcion}
            </h2>
            <div className='max-w-3xl'>
              <BlockContent blocks={description} />
            </div>
          </div>
        )}
        {/* Gallery Section */}
        {gallery && gallery.length > 0 && (
          <div className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>{t.galeria}</h2>
            <ExhibitionImageGallery images={gallery} />
          </div>
        )}
      </div>
      {/* Formulario de Postulación */}
      <div className='container mx-auto px-4 pb-16'>
        <h2 className='text-3xl font-bold uppercase mb-6'>{t.formulario}</h2>
        <ResidencyForm locale={locale} />
      </div>
    </div>
  )
}
