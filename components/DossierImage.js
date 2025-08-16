import Image from "next/image";
import blur from "../public/img/blur.jpg";

export default function DossierImage({ id, emission, saison }) {
  return (
    <Image
      blurDataURL={blur.src}
      placeholder="blur"
      src={`/img/s${saison}/${emission}-${id}.jpg`}
      alt={`Photo Saison ${saison} Audience ${emission} Bureau ${id}`}
      width={640}
      height={480}
    />
  );
}
