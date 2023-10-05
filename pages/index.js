import { desktops as json } from '../data/data';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ScrollToTop from 'react-scroll-to-top';
import Card from '../components/Card';

json.desktop.reverse();
export default function Home() {
  const router = useRouter();

  let saisonFilter = parseInt(router.query.saison) || 'all';
  let audienceFilter = router.query.audience || 'all';
  let jugementFilter = router.query.jugement || 'all';
  let sanctionFilter = router.query.sanction || 'all';

  let jugements = {};
  let sanctions = {};
  let desktopFitered = [];

  for (const desktop of json.desktop) {
    if (saisonFilter !== 'all' && saisonFilter !== desktop.saison) continue;
    if (jugementFilter !== 'all' && jugementFilter !== desktop.jugement)
      continue;
    if (sanctionFilter !== 'all' && sanctionFilter !== desktop.sanction)
      continue;
    if (
      audienceFilter !== 'all' &&
      audienceFilter !== `s${desktop.saison}e${desktop.emission}`
    )
      continue;

    desktopFitered.push(desktop);
    jugements[desktop.jugement] =
      jugements[desktop.jugement] !== undefined
        ? jugements[desktop.jugement] + 1
        : 1;
    if (desktop.sanction)
      sanctions[desktop.sanction] =
        sanctions[desktop.sanction] !== undefined
          ? sanctions[desktop.sanction] + 1
          : 1;
  }

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
                  audienceFilter = 'all';
                  router.push(
                    `?saison=${e.target.value}&audience=${audienceFilter}&jugement=${jugementFilter}&sanction=${sanctionFilter}`
                  );
                }}
                value={saisonFilter}
              >
                <option value="all">Toutes les saisons</option>
                {[1, 2, 3].map((saison, index) => {
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
                  router.push(
                    `?saison=${saisonFilter}&audience=${e.target.value}&jugement=${jugementFilter}&sanction=${sanctionFilter}`
                  );
                }}
                value={audienceFilter}
              >
                <option value="all">Toutes les audiences</option>
                {Object.entries(json.emission).map(([key, emission]) => {
                  if (
                    saisonFilter !== 'all' &&
                    emission.saison !== saisonFilter
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
                  sanctionFilter = 'all';
                  router.push(
                    `?saison=${saisonFilter}&audience=${audienceFilter}&jugement=${e.target.value}&sanction=${sanctionFilter}`
                  );
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
          saisonFilter !== 2 && (
            <div className="level-item">
              <div className="control">
                <div className="select">
                  <select
                    onChange={(e) => {
                      if (e.target.value !== 'all') jugementFilter = 'coupable';
                      router.push(
                        `?saison=${saisonFilter}&audience=${audienceFilter}&jugement=${jugementFilter}&sanction=${e.target.value}`
                      );
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
          {desktopFitered.length === 0 && (
            <div>Aucun bureau trouvé avec ces filtres </div>
          )}
          {desktopFitered.map((desktop, index) => {
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
    </main>
  );
}
