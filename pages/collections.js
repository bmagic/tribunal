import json from '../public/data.json'
import Header from '../components/Header';
import Card from '../components/Card';
json.collection.reverse()
export default function Home() {
  return (
    <main >
      <Header />
      <div className="section container">
        <div className='columns is-multiline'>
          {json.collection.map((desktop) => {

            const emission = json.emission[`s${desktop.saison}e${desktop.emission}`]
            return <div key={desktop.id} className="column is-4">
              <Card desktop={desktop} emission={emission} collection={true} />
            </div>

          })}
        </div>
      </div>
    </main>
  )
}
