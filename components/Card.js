import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import DesktopImage from '../components/DesktopImage';

export default function Card({ emission, desktop, type }) {
  return (
    <div className="card">
      <div className="card-image">
        <a
          target="_blank"
          rel="noreferrer"
          href={`${desktop.url || emission.url}?t=${desktop.time}`}
        >
          <figure className="image is-16by9">
            <DesktopImage
              type={type}
              id={desktop.id}
              saison={desktop.saison}
              emission={desktop.emission}
            />
          </figure>
          {desktop.jugement !== 'nonjuge' && (
            <img
              alt={`Jugement ${desktop.id} de l'épisode ${desktop.saison}e${desktop.emission} : ${desktop.sanction || desktop.jugement}`}
              src={`/jugements/${desktop.sanction || desktop.jugement}.png`}
              className="jugement"
            />
          )}
        </a>
      </div>
      <div className="card-content">
        <div className="content has-text-centered">
          Saison {desktop.saison} Audience {desktop.emission} Bureau{' '}
          {desktop.id}
          {desktop.owner && (
            <span>,&nbsp;&nbsp;Accusé·e: {desktop.owner || 'Anonyme'}</span>
          )}
          <br />
          <span className="is-italic">{emission.date}</span>
        </div>
      </div>
      <footer className="card-footer">
        <a
          className="card-footer-item"
          target="_blank"
          rel="noreferrer"
          href={`${desktop.url || emission.url}?t=${desktop.time}`}
        >
          <FontAwesomeIcon
            icon={emission.url.search('youtu') !== -1 ? faYoutube : faTwitch}
          />
          &nbsp;&nbsp;Voir le jugement
        </a>
      </footer>
    </div>
  );
}
