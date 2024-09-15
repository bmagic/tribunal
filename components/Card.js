import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import DossierImage from '../components/DossierImage';

export default function Card({ emission, dossier, type }) {
  return (
    <div className="card">
      <div className="card-image">
        <a
          target="_blank"
          rel="noreferrer"
          href={`${dossier.url || emission.url}?t=${dossier.time}`}
        >
          <figure className="image is-16by9">
            <DossierImage
              id={dossier.id}
              saison={dossier.saison}
              emission={dossier.emission}
            />
          </figure>
          {dossier.jugement !== 'nonjuge' && (
            <img
              alt={`Jugement ${dossier.id} de l'épisode ${dossier.saison}e${dossier.emission} : ${dossier.sanction || dossier.jugement}`}
              src={`/jugements/${dossier.sanction || dossier.jugement}.png`}
              className="jugement"
            />
          )}
        </a>
      </div>
      <div className="card-content">
        <div className="content has-text-centered">
          Saison {dossier.saison} Audience {dossier.emission} {dossier.type ? dossier.type.charAt(0).toUpperCase() + dossier.type.slice(1) : "Bureau"}{' '}
          {dossier.id}
          {dossier.owner && (
            <span>,&nbsp;&nbsp;Accusé·e: {dossier.owner || 'Anonyme'}</span>
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
          href={`${dossier.url || emission.url}?t=${dossier.time}`}
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
