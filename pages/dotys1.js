import Header from '../components/Header';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import animaux from '../img/s1/doty/animaux.jpg'
import miniminimaliste from '../img/s1/doty/miniminimaliste.jpg'
import bricolobordelique from '../img/s1/doty/bricolobordelique.jpg'
import angoisse from '../img/s1/doty/angoisse.jpg'
import prixspecialdupublic from '../img/s1/doty/prixspecialdupublic.jpg'
import doty from '../img/s1/doty/doty.jpg'
import hop from '../img/s1/doty/hop.jpg'
import Image from 'next/image';
import ScrollToTop from "react-scroll-to-top";

export default function Home() {
  return (
    <main className='doty'>
      <Header />
      <ScrollToTop smooth />

      <section className="hero is-small" style={{ backgroundColor: 'black' }}>
        <div className="hero-body">
          <div className="container">
            <Image src={hop} />
          </div>
        </div>
      </section>
      <section className="hero is-small" >
        <div className="hero-body">
          <div className="container">
            <div className='level'>
              <div className='level-item'>
                <a href="#animaux" className="button is-white is-medium is-inverted">Animaux&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
              <div className='level-item'>
                <a href="#miniminimaliste" className="button is-white is-medium is-inverted">Miniminimaliste&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
              <div className='level-item'>
                <a href="#bricolobordelique" className="button is-white is-medium is-inverted">Bricolo bordélique&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
              <div className='level-item'>
                <a href="#angoisse" className="button is-white is-medium is-inverted">Angoisse&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
              <div className='level-item'>
                <a href="#prixspecialdupublic" className="button is-white is-medium is-inverted">Prix spécial du public&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
              <div className='level-item'>
                <a href="#doty" className="button is-white is-medium is-inverted">DOTY&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>


          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${animaux.src})`
      }}>
        <div className="hero-body" id="animaux">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-6">
                <h1 className="title is-1 ">Animaux</h1>
                <hr className="content-divider" />
                <a href="https://www.twitch.tv/videos/1481209067?t=00h09m21s" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${miniminimaliste.src})`
      }}>
        <div className="hero-body" id="miniminimaliste">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <h1 className="title is-1 ">Miniminimaliste</h1>
                <hr className="content-divider" />
                <a href="https://www.twitch.tv/videos/1481209067?t=00h28m14s" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${bricolobordelique.src})`
      }}>
        <div className="hero-body" id="bricolobordelique">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-6">
                <h1 className="title is-1 ">Bricolo Bordélique</h1>
                <hr className="content-divider" />
                <a href="https://www.twitch.tv/videos/1481209067?t=00h49m43s" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${angoisse.src})`
      }}>
        <div className="hero-body" id="angoisse">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <h1 className="title is-1 ">Angoisse</h1>
                <hr className="content-divider" />
                <a href="https://www.twitch.tv/videos/1481209067?t=01h11m36s" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${prixspecialdupublic.src})`
      }}>
        <div className="hero-body" id="prixspecialdupublic">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-6">
                <h1 className="title is-1 ">Prix spécial du public</h1>
                <hr className="content-divider" />
                <a href="https://www.twitch.tv/videos/1481209067?t=01h45m14s" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${doty.src})`
      }}>
        <div className="hero-body" id="doty">
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                <h1 className="title is-1 ">DOTY</h1>
                <hr className="content-divider" />
                <a href="https://www.twitch.tv/videos/1481209067?t=02h00m25s" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  )
}
