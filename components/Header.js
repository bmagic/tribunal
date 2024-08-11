import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Header() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Greffe du Tribunal des Bureaux</title>
        <link rel="icon" href="favicon.ico" />
        <meta name="author" content="Bmagic" />
        <meta
          name="description"
          content="Retrouvez les minutes de tous les jugements de l'honorable juge ackboo"
        />
        <meta property="og:url" content="https://tribunal.bmagic.fr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Greffe du Tribunal des Bureaux" />
        <meta
          property="og:description"
          content="Retrouvez les minutes de tous les jugements de l'honorable juge ackboo"
        />
        <meta
          property="og:image"
          content="https://tribunal.bmagic.fr/logo.jpg"
        />
      </Head>
      <div className="container">
        <nav
          className="navbar is-transparent"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a
              role="button"
              className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            className={`navbar-menu ${
              isOpen ? 'is-active' : ''
            } is-transparent`}
          >
            <div className="navbar-start">
              <Link
                href="/"
                className={`navbar-item ${
                  router.pathname === '/' ? 'is-active' : ''
                }`}
              >
                Bureaux
              </Link>
              <Link
                href="/vintages"
                className={`navbar-item ${
                  router.pathname === '/vintages' ? 'is-active' : ''
                }`}
              >
                Vintages
              </Link>
              <Link
                href="/salons"
                className={`navbar-item ${
                  router.pathname === '/salons' ? 'is-active' : ''
                }`}
              >
                Salons
              </Link>
              <Link
                href="/claviers"
                className={`navbar-item ${
                  router.pathname === '/claviers' ? 'is-active' : ''
                }`}
              >
                Claviers
              </Link>
              <Link
                href="/collections"
                className={`navbar-item ${
                  router.pathname === '/collections' ? 'is-active' : ''
                }`}
              >
                Collections
              </Link>
              <Link
                href="/stats"
                className={`navbar-item ${
                  router.pathname === '/stats' ? 'is-active' : ''
                }`}
              >
                Statistiques
              </Link>
              <Link
                href="/dotys1"
                className={`navbar-item ${
                  router.pathname === '/dotys1' ? 'is-active' : ''
                }`}
              >
                DOTY Saison 1
              </Link>
              <Link
                href="/dotys2"
                className={`navbar-item ${
                  router.pathname === '/dotys2' ? 'is-active' : ''
                }`}
              >
                DOTY Saison 2
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="has-text-centered pb-3">
        <h1 className="title is-size-1">Greffe du Tribunal des Bureaux</h1>
        <h2 className="subtitle">Présidé par l&lsquo;honorable juge ackboo</h2>
        <ReactAudioPlayer src="bureaulogie.mp3" controls />
      </div>
    </div>
  );
}
