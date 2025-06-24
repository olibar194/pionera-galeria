import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import Link from 'next/link'

export default function CalaHeaderLink() {
  const pathname = usePathname()
  const locale = useLocale() as 'es' | 'en'
  // Path multilenguaje
  const calaPath = `/${locale}/club-atletico-lxs-amores`
  const isActive = pathname === calaPath
  return (
    <Link
      href={calaPath}
      className={`px-4 py-2 text-lg uppercase font-bold transition-colors tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${
        isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black dark:text-white'
      }`}
    >
      C.A.L.A
    </Link>
  )
}
