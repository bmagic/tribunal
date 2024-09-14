import { desktops as json } from '../data/data';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ScrollToTop from 'react-scroll-to-top';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

json.desktop.reverse();
const Home = ({ initialSaisonFilter, initialAudienceFilter, initialJugementFilter, initialSanctionFilter }) => {
  const router = useRouter();

  const [desktopFitered, setDesktopFitered] = useState([]);
  const [destkopDisplayed, setDesktopDisplayed] = useState([]);

  const [page, setPage] = useState(1);
  const [saisonFilter, setSaisonFilter] = useState(initialSaisonFilter || 'all');
  const [audienceFilter, setAudienceFilter] = useState(initialAudienceFilter || 'all');
  const [jugementFilter, setJugementFilter] = useState(initialJugementFilter || 'all');
  const [sanctionFilter, setSanctionFilter] = useState(initialSanctionFilter || 'all');

  const [jugements, setJugements] = useState({});
  const [sanctions, setSanctions] = useState({});

  useEffect(() => {
    let desktops = []
    let tmpJudgements = {};
    let tmpSanctions = {};
    for (const desktop of json.desktop) {
      if (saisonFilter !== 'all' && parseInt(saisonFilter) !== desktop.saison) continue;
      if (jugementFilter !== 'all' && jugementFilter !== desktop.jugement) continue;
      if (sanctionFilter !== 'all' && sanctionFilter !== desktop.sanction) continue;
      if (audienceFilter !== 'all' && audienceFilter !== `s${desktop.saison}e${desktop.emission}`) continue;

      desktops.push(desktop);
      tmpJudgements[desktop.jugement] = tmpJudgements[desktop.jugement] !== undefined ? tmpJudgements[desktop.jugement] + 1 : 1;
      setJugements(tmpJudgements);

      tmpSanctions[desktop.sanction] = tmpSanctions[desktop.sanction] !== undefined ? tmpSanctions[desktop.sanction] + 1 : 1;
      setSanctions(tmpSanctions);
    }
    router.push(
      `?saison=${saisonFilter}&audience=${audienceFilter}&jugement=${jugementFilter}&sanction=${sanctionFilter}`,
      undefined, { shallow: true }
    );

    setDesktopFitered(desktops);
    setDesktopDisplayed(desktops.slice(0, page * 9));
  }, [saisonFilter, audienceFilter, jugementFilter, sanctionFilter, page]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isBottom, setIsBottom] = useState(false);


  useEffect(() => {
    if (isBottom && desktopFitered.length > destkopDisplayed.length) {
      setPage(page + 1);
    }
  }, [isBottom]);


  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= documentHeight - 50) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  return (
    <main>
      <Header />

      <ScrollToTop smooth />
      <div className="level pb-1 pt-5">
        <div className="level-item">
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => {
                  setPage(1)
                  setAudienceFilter('all');
                  setSaisonFilter(e.target.value);
                }}
                value={saisonFilter}
              >
                <option value="all">Toutes les saisons</option>
                {[1, 2, 3, 4].map((saison, index) => {
                  return (
                    <option key={index} value={saison}>
                      Saison {saison}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="level-item">
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => {
                  setPage(1)
                  setAudienceFilter(e.target.value);
                }}
                value={audienceFilter}
              >
                <option value="all">Toutes les audiences</option>
                {Object.entries(json.emission).map(([key, emission]) => {
                  if (
                    saisonFilter !== 'all' &&
                    emission.saison !== parseInt(saisonFilter)
                  )
                    return null;
                  return (
                    <option key={key} value={key}>
                      {saisonFilter === 'all'
                        ? `Saison ${emission.saison} - Audience ${emission.emission}`
                        : `Audience ${emission.emission}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="level-item">
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => {
                  setPage(1)
                  setSanctionFilter('all');
                  setJugementFilter(e.target.value);
                }}
                value={jugementFilter}
              >
                <option value="all">Tous les jugements</option>
                <option value="relaxe">Relaxe</option>
                <option value="coupable">Coupable</option>
                <option value="nonjuge">Non jugé</option>
              </select>
            </div>
          </div>
        </div>
        {(jugementFilter === 'all' || jugementFilter === 'coupable') &&
          (saisonFilter < 2 || saisonFilter == "all") && (
            <div className="level-item">
              <div className="control">
                <div className="select">
                  <select
                    onChange={(e) => {
                      setPage(1)
                      if (e.target.value !== 'all')
                        setJugementFilter('coupable');
                      setSanctionFilter(e.target.value);

                    }}
                    value={sanctionFilter}
                  >
                    <option value="all">Toutes les sanctions</option>
                    <option value="rappel">Rappel à la loi</option>
                    <option value="epreuve">Mise à l&lsquo;épreuve</option>
                    <option value="gnouf">Direct au gnouf</option>
                  </select>
                </div>
              </div>
            </div>
          )}
      </div>

      <div className="hero is-small">
        <div className="hero-body">
          <div className="columns is-multiline">
            <div className="column is-12 has-text-centered">
              <div>
                <p className="heading"> Nombre de cas</p>
                <p className="title is-size-1"> {desktopFitered.length}</p>
              </div>
            </div>
            {jugementFilter === 'all' && (
              <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading">
                    {' '}
                    {jugements['relaxe'] > 1 ? 'Relaxes' : 'Relaxe'}
                  </p>
                  <p className="title is-size-2"> {jugements['relaxe'] || 0}</p>
                </div>
              </div>
            )}
            {jugementFilter === 'all' && (
              <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading">
                    {' '}
                    {jugements['coupable'] > 1 ? 'Coupables' : 'Coupable'}
                  </p>
                  <p className="title is-size-2">
                    {' '}
                    {jugements['coupable'] || 0}
                  </p>
                </div>
              </div>
            )}
            {jugementFilter === 'all' && (
              <div className="column is-4 has-text-centered">
                <div>
                  <p className="heading">
                    {' '}
                    {jugements['nonjuge'] > 1 ? 'Non jugés' : 'Non jugé'}
                  </p>
                  <p className="title is-size-2">
                    {' '}
                    {jugements['nonjuge'] || 0}
                  </p>
                </div>
              </div>
            )}
            {(jugementFilter === 'all' || jugementFilter === 'coupable') &&
              sanctionFilter === 'all' &&
              saisonFilter == 1 && (
                <div className="column is-4 has-text-centered">
                  <div>
                    <p className="heading">
                      {sanctions['rappel'] > 1
                        ? 'Rappels à la loi'
                        : 'Rappel à la loi'}
                    </p>
                    <p className="title is-size-2">
                      {' '}
                      {sanctions['rappel'] || 0}
                    </p>
                  </div>
                </div>
              )}
            {(jugementFilter === 'all' || jugementFilter === 'coupable') &&
              sanctionFilter === 'all' &&
              saisonFilter == 1 && (
                <div className="column is-4 has-text-centered">
                  <div>
                    <p className="heading">
                      {sanctions['epreuve'] > 1
                        ? "Mises à l'épreuve"
                        : "Mise à l'épreuve"}
                    </p>
                    <p className="title is-size-2">
                      {' '}
                      {sanctions['epreuve'] || 0}
                    </p>
                  </div>
                </div>
              )}
            {(jugementFilter === 'all' || jugementFilter === 'coupable') &&
              sanctionFilter === 'all' &&
              saisonFilter == 1 && (
                <div className="column is-4 has-text-centered">
                  <div>
                    <p className="heading">
                      {sanctions['gnouf'] > 1 ? 'Gnoufs' : 'Gnouf'}
                    </p>
                    <p className="title is-size-2">
                      {' '}
                      {sanctions['gnouf'] || 0}
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="section container">
        <div className="columns is-multiline">
          {destkopDisplayed.length === 0 && (
            <div>Aucun bureau trouvé avec ces filtres </div>
          )}
          {destkopDisplayed.map((desktop, index) => {
            const emission =
              json.emission[`s${desktop.saison}e${desktop.emission}`];
            if (desktop.hidden === true) return null;
            return (
              <div key={index} className="column is-4">
                <Card desktop={desktop} emission={emission} />
              </div>
            );
          })}
        </div>
      </div>
    </main >
  );
};

Home.getInitialProps = async ({ query }) => {
  return {
    initialSaisonFilter: query.saison || 'all',
    initialAudienceFilter: query.audience || 'all',
    initialJugementFilter: query.jugement || 'all',
    initialSanctionFilter: query.sanction || 'all',
  };
};

export default Home;