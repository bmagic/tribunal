import json from '../public/data.json'
import Header from '../components/Header';
import Card from '../components/Card';

export default function Home() {
  return (
    <main >
      <Header />
      <div className="section container">
        <div className='columns is-multiline'>
          {json.collection.map((desktop) => {

            const emission = json.emission[desktop.emission - 1]
            return <div key={desktop.id} className="column is-4">
              <Card desktop={desktop} emission={emission} />
            </div>

          })}
        </div>
      </div>
    </main>
  )
}
