import { claviers as json } from '../data/data'
import Header from '../components/Header'
import Card from '../components/Card'
json.clavier.reverse()
export default function Claviers() {
  return (
    <main>
      <Header />
      <div className="section container pt-5">
        <div className="columns is-multiline">
          {json.clavier.map((desktop) => {
            const emission =
              json.emission[`s${desktop.saison}e${desktop.emission}`]
            return (
              <div key={desktop.id} className="column is-4">
                <Card desktop={desktop} emission={emission} type={'k'} />
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
