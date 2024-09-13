import Header from '../components/Header';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import pire from '../public/img/s3/doty/pire.jpg'
import doty from '../public/img/s3/doty/doty.jpg'
import header from '../public/img/s3/doty/header.png'
import Image from 'next/image';
import ScrollToTop from "react-scroll-to-top";

export default function Home() {
  return (
    <main className='doty'>
      <Header />
      <ScrollToTop smooth />

      <section className="hero is-small" style={{ backgroundColor: 'black' }}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <Image alt='Bandeau de présentation' src={header} />
          </div>
        </div>
      </section>
      <section className="hero is-small" >
        <div className="hero-body">
          <div className="container">
            <div className='level'>
              <div className='level-item'>
                <a href="#pire" className="button is-white is-medium is-inverted">Pire bureau&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
              <div className='level-item'>
                <a href="#doty" className="button is-white is-medium is-inverted">DOTY&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>


          </div>
        </div>
      </section>
      <section className="parallax hero is-fullheight " style={{
        backgroundImage: `url(${pire.src})`
      }}>
        <div className="hero-body" id="pire">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-6">
                <h1 className="title is-1 ">Pire bureau</h1>
                <hr className="content-divider" />
                <a href="https://youtu.be/uFRW1-P771w?t=965" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
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
                <a href="https://youtu.be/uFRW1-P771w?t=3280" rel="noreferrer" target='_blank' className="button is-white is-inverted">Regarder la catégorie&ensp;<FontAwesomeIcon icon={faChevronRight} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  )
}
