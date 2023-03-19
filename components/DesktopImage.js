import Image from 'next/image'
import blur from '../public/img/blur.jpg'

export default function DesktopImage({ id, emission, saison, type }) {
  return (
    <Image
      width={640}
      height={360}
      blurDataURL={blur.src}
      placeholder="blur"
      src={`/img/s${saison}/${emission}${type || ''}-${id}.jpg`}
    />
  )
}
