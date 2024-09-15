import Image from 'next/image'
import blur from '../public/img/blur.jpg'
import dynamic from 'next/dynamic'



export default function DesktopImage({ id, emission, saison, type }) {
  return (
    <Image

      blurDataURL={blur.src}
      placeholder="blur"
      src={`/img/s${saison}/${emission}${type || ''}-${id}.jpg`}
      alt={`Photo Saison ${saison} Audience ${emission} Bureau ${id}`}
    />
  )
}
