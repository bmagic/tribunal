import json from '../public/data.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import DesktopImage from '../components/DesktopImage'
import Header from '../components/Header';

export default function Home() {
  return (
    <main >
      <Header />
      <div className="section container">
        <div className='columns is-multiline'>
          {json.collection.map((desktop) => {

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
  )
}
