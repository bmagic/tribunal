import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch, faYoutube } from "@fortawesome/free-brands-svg-icons";
import DesktopImage from '../components/DesktopImage'

export default function Card({ emission, desktop }) {
    return <div className="card">
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
            <a className="card-footer-item" target='_blank' rel="noreferrer" href={`${emission.url}?t=${desktop.time}`}><FontAwesomeIcon icon={emission.url.search('youtu') !== -1 ? faYoutube : faTwitch} />&nbsp;&nbsp;Voir le jugement</a>
        </footer>
    </div>
}