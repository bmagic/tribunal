import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import json from '../public/data.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from 'next/router'
import DesktopImage from '../components/DesktopImage'

export default function Home() {
  const router = useRouter()

  let audienceFilter = router.query.audience || 'all'
  let jugementFilter = router.query.jugement || 'all'
  let sanctionFilter = router.query.sanction || 'all'

  let jugements = {}
  let sanctions = {}
  let desktopFitered = []
  for (const desktop of json.desktop) {
    if (jugementFilter !== 'all' && jugementFilter !== desktop.jugement) continue
    if (sanctionFilter !== 'all' && sanctionFilter !== desktop.sanction) continue
    if (audienceFilter !== 'all' && parseInt(audienceFilter) !== desktop.emission) continue

    desktopFitered.push(desktop)
    jugements[desktop.jugement] = jugements[desktop.jugement] !== undefined ? jugements[desktop.jugement] + 1 : 1
    if (desktop.sanction) sanctions[desktop.sanction] = sanctions[desktop.sanction] !== undefined ? sanctions[desktop.sanction] + 1 : 1
  }

  return (
    <div>
      <Head>
        <title>Greffe du Tribunal des Bureaux</title>
        <link rel="icon" href="favicon.ico" />
        <meta name="author" content="Bmagic" />
        <meta name="description" content="Retrouvez les minutes de tous les jugements de l'honorable juge Ackboo" />
        <meta property="og:url" content="https://tribunal.bmagic.fr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Greffe du Tribunal des Bureaux" />
        <meta property="og:description" content="Retrouvez les minutes de tous les jugements de l'honorable juge Ackboo" />
        <meta property="og:image" content="https://tribunal.bmagic.fr/logo.jpg" />
      </Head>

      <main >
        <div className="is-italic has-text-grey p-1 is-pulled-right">
          Pour que votre pseudo soit référencé ou pour tout autre demande me contacter sur discord Bmagic#6057.
        </div>
        <a className="is-pulled-left" href="https://github.com/bmagic/tribunal"><img loading="lazy" width="120" height="120" src="https://github.blog/wp-content/uploads/2008/12/forkme_left_gray_6d6d6d.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>

        <div className='section has-text-centered'>
          <h1 className="title is-size-1">
            Greffe du Tribunal des Bureaux
          </h1>
          <h2 className="subtitle">Présidé par l&lsquo;honorable juge Ackboo</h2>
          <div className='container '>
            <div className="level">
              <div className="level-item">
                <div className="control">
                  <div className="select">
                    <select onChange={(e) => router.push(`?audience=${e.target.value}&jugement=${jugementFilter}&sanction=${sanctionFilter}`)} value={audienceFilter}>
                      <option value='all'>Toutes les audiences</option>
                      {json.emission.map((emission, index) => {
                        return <option key={index} value={index + 1}>Audience {index + 1} - {emission.date}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="level-item">
                <div className="control">
                  <div className="select" >
                    <select onChange={(e) => { sanctionFilter = 'all'; router.push(`?audience=${audienceFilter}&jugement=${e.target.value}&sanction=${sanctionFilter}`) }} value={jugementFilter}>
                      <option value='all'>Tous les jugements</option>
                      <option value='relaxe'>Relaxe</option>
                      <option value='coupable'>Coupable</option>
                      <option value='nonjuge'>Non jugé</option>
                    </select>
                  </div>
                </div>
              </div>
              {(jugementFilter === 'all' || jugementFilter === 'coupable') && <div className="level-item">
                <div className="control">
                  <div className="select" >
                    <select onChange={(e) => { if (e.target.value !== 'all') jugementFilter = "coupable"; router.push(`?audience=${audienceFilter}&jugement=${jugementFilter}&sanction=${e.target.value}`) }} value={sanctionFilter}>
                      <option value='all'>Toutes les sanctions</option>
                      <option value='rappel'>Rappel à la loi</option>
                      <option value='epreuve'>Mise à l&lsquo;épreuve</option>
                      <option value='gnouf'>Direct au gnouf</option>
                    </select>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className='hero is-small'>
          <div className="hero-body">
            <div className="columns is-multiline">
              <div className="column is-12 has-text-centered">
                <div>
                  <p className="heading"> Nombre de cas</p>
                  <p className="title is-size-1"> {desktopFitered.length}</p>
                </div>
              </div>
              {jugementFilter === 'all' && <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading"> {jugements["relaxe"] > 1 ? 'Relaxes' : 'Relaxe'}</p>
                  <p className="title is-size-2"> {jugements["relaxe"] || 0}</p>
                </div>
              </div>}
              {jugementFilter === 'all' && <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading"> {jugements["coupable"] > 1 ? 'Coupables' : 'Coupable'}</p>
                  <p className="title is-size-2"> {jugements["coupable"] || 0}</p>
                </div>
              </div>}
              {jugementFilter === 'all' && <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading"> {jugements["nonjuge"] > 1 ? 'Non jugés' : 'Non jugé'}</p>
                  <p className="title is-size-2"> {jugements["nonjuge"] || 0}</p>
                </div>
              </div>}
              {((jugementFilter === 'all' || jugementFilter === 'coupable') && sanctionFilter === 'all') && <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading">{sanctions["rappel"] > 1 ? 'Rappels à la loi' : 'Rappel à la loi'}</p>
                  <p className="title is-size-2"> {sanctions["rappel"] || 0}</p>
                </div>
              </div>}
              {((jugementFilter === 'all' || jugementFilter === 'coupable') && sanctionFilter === 'all') && <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading">{sanctions["epreuve"] > 1 ? 'Mises à l\'épreuve' : 'Mise à l\'épreuve'}</p>
                  <p className="title is-size-2"> {sanctions["epreuve"] || 0}</p>
                </div>
              </div>}
              {((jugementFilter === 'all' || jugementFilter === 'coupable') && sanctionFilter === 'all') && <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading">{sanctions["gnouf"] > 1 ? 'Gnoufs' : 'Gnouf'}</p>
                  <p className="title is-size-2"> {sanctions["gnouf"] || 0}</p>
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className="section container">
          <div className='columns is-multiline'>
            {desktopFitered.length === 0 && <div>Aucun bureau trouvé avec ces filtres </div>}
            {desktopFitered.map((desktop) => {

              const emission = json.emission[desktop.emission - 1]
              return <div key={desktop.id} className="column is-4">
                <div className="card">
                  <div className="card-image">
                    <a target='_blank' rel="noreferrer" href={`${emission.url}?t=${desktop.time}`}><DesktopImage id={desktop.id} />
                      {desktop.jugement !== "nonjuge" && <img src={`/jugements/${desktop.sanction || desktop.jugement}.png`} className="jugement" />}
                    </a>
                  </div>
                  <div className="card-content">
                    <div className="content ">
                      Audience: {desktop.emission}{desktop.owner && <span>,&nbsp;&nbsp;Accusé·e: {desktop.owner || "Anonyme"}</span>}<br />
                      <span className="is-italic">{emission.date}</span>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <a className="card-footer-item" target='_blank' rel="noreferrer" href={`${emission.url}?t=${desktop.time}`}><FontAwesomeIcon icon={faYoutube} />&nbsp;&nbsp;Voir le jugement</a>
                  </footer>
                </div>
              </div>

            })}
          </div>
        </div>
      </main>
    </div>
  )
}
