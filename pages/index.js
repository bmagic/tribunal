import { dossiers as json } from '../data/data';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ScrollToTop from 'react-scroll-to-top';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

json.data.reverse();
const Home = ({ initialTypeFilter, initialSaisonFilter, initialAudienceFilter, initialJugementFilter, initialSanctionFilter, }) => {
  const router = useRouter();

  const [dossiersFitered, setDossiersFitered] = useState([]);
  const [dossiersDisplayed, setDossiersDisplayed] = useState([]);

  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState(initialTypeFilter || 'all');
  const [saisonFilter, setSaisonFilter] = useState(initialSaisonFilter || 'all');
  const [audienceFilter, setAudienceFilter] = useState(initialAudienceFilter || 'all');
  const [jugementFilter, setJugementFilter] = useState(initialJugementFilter || 'all');
  const [sanctionFilter, setSanctionFilter] = useState(initialSanctionFilter || 'all');

  const [jugements, setJugements] = useState({});
  const [sanctions, setSanctions] = useState({});

  useEffect(() => {
    let dossiers = []
    let tmpJudgements = {};
    let tmpSanctions = {};
    for (const dossier of json.data) {
      if (typeFilter !== 'all' && dossier.type !== typeFilter) continue
      if (saisonFilter !== 'all' && parseInt(saisonFilter) !== dossier.saison) continue;
      if (jugementFilter !== 'all' && jugementFilter !== dossier.jugement) continue;
      if (sanctionFilter !== 'all' && sanctionFilter !== dossier.sanction) continue;
      if (audienceFilter !== 'all' && audienceFilter !== `s${dossier.saison}e${dossier.emission}`) continue;

      if (dossier.hidden === true) { console.log("found"); continue };

      dossiers.push(dossier);
      tmpJudgements[dossier.jugement] = tmpJudgements[dossier.jugement] !== undefined ? tmpJudgements[dossier.jugement] + 1 : 1;
      setJugements(tmpJudgements);

      tmpSanctions[dossier.sanction] = tmpSanctions[dossier.sanction] !== undefined ? tmpSanctions[dossier.sanction] + 1 : 1;
      setSanctions(tmpSanctions);
    }
    router.push(
      `?type=${typeFilter}&saison=${saisonFilter}&audience=${audienceFilter}&jugement=${jugementFilter}&sanction=${sanctionFilter}`,
      undefined, { shallow: true }
    );

    setDossiersFitered(dossiers);
    setDossiersDisplayed(dossiers.slice(0, page * 9));
  }, [typeFilter, saisonFilter, audienceFilter, jugementFilter, sanctionFilter, page]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isBottom, setIsBottom] = useState(false);


  useEffect(() => {
    if (isBottom && dossiersFitered.length > dossiersDisplayed.length) {
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
                  setSaisonFilter('all');
                  setAudienceFilter('all');
                  setSanctionFilter('all');
                  setJugementFilter('all');
                  setTypeFilter(e.target.value);
                }}
                value={typeFilter}
              >
                <option value="all">Tous les dossiers</option>
                <option value="bureau">Bureaux</option>
                <option value="vintage">Bureaux Vintages</option>
                <option value="clavier">Claviers</option>
                <option value="collection">Collections</option>
                <option value="salon">Salons</option>
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
                  setAudienceFilter('all');
                  setSanctionFilter('all');
                  setJugementFilter('all');
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
                {Object.entries(json.emissions).map(([key, emission]) => {
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
        {(jugementFilter === 'all' || jugementFilter === 'coupable')
          && (
            <div className="level-item">
              <div className="control">
                <div className="select">
                  <select
                    disabled={(saisonFilter >= 2)}
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
                <p className="title is-size-1"> {dossiersFitered.length}</p>
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
          {dossiersDisplayed.length === 0 && (
            <div>Aucun bureau trouvé avec ces filtres </div>
          )}
          {dossiersDisplayed.map((dossier, index) => {
            const emission =
              json.emissions[`s${dossier.saison}e${dossier.emission}`];
            return (
              <div key={index} className="column is-4">
                <Card dossier={dossier} emission={emission} />
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
    initialTypeFilter: query.type || 'all',
    initialSaisonFilter: query.saison || 'all',
    initialAudienceFilter: query.audience || 'all',
    initialJugementFilter: query.jugement || 'all',
    initialSanctionFilter: query.sanction || 'all',
  };
};

export default Home;