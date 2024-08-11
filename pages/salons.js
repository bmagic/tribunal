import { salons as json } from '../data/data';
import Header from '../components/Header';
import Card from '../components/Card';
json.salon.reverse();
export default function Salons() {
  return (
    <main>
      <Header />
      <div className="section container pt-5">
        <div className="columns is-multiline">
          {json.salon.map((desktop) => {
            const emission =
              json.emission[`s${desktop.saison}e${desktop.emission}`];
            return (
              <div key={desktop.id} className="column is-4">
                <Card desktop={desktop} emission={emission} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
