import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactAudioPlayer from 'react-audio-player'

export default function Header() {
    const router = useRouter()

    return <div>

        <Head>
            <title>Greffe du Tribunal des Bureaux</title>
            <link rel="icon" href="favicon.ico" />
            <meta name="author" content="Bmagic" />
            <meta name="description" content="Retrouvez les minutes de tous les jugements de l'honorable juge ackboo" />
            <meta property="og:url" content="https://tribunal.bmagic.fr" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Greffe du Tribunal des Bureaux" />
            <meta property="og:description" content="Retrouvez les minutes de tous les jugements de l'honorable juge ackboo" />
            <meta property="og:image" content="https://tribunal.bmagic.fr/logo.jpg" />
        </Head>

        <div className="is-italic has-text-grey p-1 is-pulled-right">
            Pour que votre pseudo soit référencé ou pour tout autre demande me contacter sur discord Bmagic#6057
        </div>
        <div className='section has-text-centered pb-0'>
            <h1 className="title is-size-1">
                Greffe du Tribunal des Bureaux
            </h1>
            <h2 className="subtitle">Présidé par l&lsquo;honorable juge ackboo</h2>
            <ReactAudioPlayer
            src="bureaulogie.mp3"
            controls
            />
            <div className='container'>
                <div className="tabs">
                    <ul>
                        <li className={`${router.pathname === '/' ? 'is-active' : ''}`}><Link href="/"><a>Bureaux</a></Link></li>
                        <li className={`${router.pathname === '/collections' ? 'is-active' : ''}`} ><Link href="/collections"><a>Collections</a></Link></li>
                        <li className={`${router.pathname === '/stats' ? 'is-active' : ''}`} ><Link href="/stats"><a>Statistiques</a></Link></li>
                        <li className={`${router.pathname === '/dotys1' ? 'is-active' : ''}`} ><Link href="/dotys1"><a>DOTY Saison 1</a></Link></li>

                    </ul>
                </div>
            </div>
        </div>
    </div >
}