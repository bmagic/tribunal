import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'
import Header from '../components/Header'
import { desktops as json } from '../data/data'

export default function Stats() {
  const datas1 = []
  const datas2 = []
  const datas3 = []
  let counts1 = 0
  let counts2 = 0
  let counts3 = 0
  let relaxes1 = 0
  let relaxes2 = 0
  let relaxes3 = 0

  const map = { s1: {}, s2: {}, s3: {} }
  let relaxe = 0
  for (const [key, emission] of Object.entries(json.emission)) {
    map[`s${emission.saison}`][`e${emission.emission}`] = {
      name: json.emission[key].date,
      coupable: 0,
      relaxe: 0,
      gnouf: 0,
      epreuve: 0,
      rappel: 0,
    }
  }
  for (const desktop of json.desktop) {
    if (desktop.jugement === 'coupable') {
      map[`s${desktop.saison}`][`e${desktop.emission}`].coupable++
      switch (desktop.sanction) {
        case 'gnouf':
          map[`s${desktop.saison}`][`e${desktop.emission}`].gnouf++
          break
        case 'epreuve':
          map[`s${desktop.saison}`][`e${desktop.emission}`].epreuve++
          break
        case 'rappel':
          map[`s${desktop.saison}`][`e${desktop.emission}`].rappel++
          break
      }
    } else {
      switch (desktop.saison) {
        case 1:
          relaxes1++
          break
        case 2:
          relaxes2++
          break
        case 3:
          relaxes3++
          break
      }

      map[`s${desktop.saison}`][`e${desktop.emission}`].relaxe++
    }
    switch (desktop.saison) {
      case 1:
        counts1++
        break
      case 2:
        counts2++
        break
      case 3:
        counts3++
        break
    }

  }
  for (const [key, emission] of Object.entries(map['s1'])) {
    if (emission.gnouf !== 0 || emission.epreuve !== 0 || emission.rappel !== 0)
      delete emission.coupable
    else {
      delete emission.gnouf
      delete emission.epreuve
      delete emission.rappel
    }
    datas1.push(emission)
  }

  for (const [key, emission] of Object.entries(map['s2'])) {
    if (emission.gnouf !== 0 || emission.epreuve !== 0 || emission.rappel !== 0)
      delete emission.coupable
    else {
      delete emission.gnouf
      delete emission.epreuve
      delete emission.rappel
    }
    datas2.push(emission)
  }

  for (const [key, emission] of Object.entries(map['s3'])) {
    if (emission.gnouf !== 0 || emission.epreuve !== 0 || emission.rappel !== 0)
      delete emission.coupable
    else {
      delete emission.gnouf
      delete emission.epreuve
      delete emission.rappel
    }
    datas3.push(emission)
  }
  return (
    <main>
      <Header />
      <div className="container has-text-centered">
        <h1 className="title mt-4">Saison 1</h1>
        <div className="subtitle mt-1 mb-0">
          Le juge a traité en moyenne {Math.round(counts1 / datas1.length)}{' '}
          bureaux par audience.
        </div>
        <div className="subtitle mt-0 mb-2">
          Dans sa clémence, le juge a relaxé{' '}
          {Math.round((relaxes1 / counts1) * 100)}% des bureaux.
        </div>
        <div style={{ width: '100%', height: 300 }} className="mb-5">
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={datas1}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#1f2424' }} />
              <Bar dataKey="coupable" stackId="a" fill="#b20000" />
              <Bar dataKey="gnouf" stackId="a" fill="#b20000" />
              <Bar dataKey="epreuve" stackId="a" fill="#b25000" />
              <Bar dataKey="rappel" stackId="a" fill="#1aaaac" />
              <Bar dataKey="relaxe" stackId="a" fill="#1abc9c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h1 className="title mt-4">Saison 2</h1>
        <div className="subtitle mt-1 mb-0">
          Le juge a traité en moyenne {Math.round(counts2 / datas2.length)}{' '}
          bureaux par audience.
        </div>
        <div className="subtitle mt-0 mb-2">
          Dans sa clémence, le juge a relaxé{' '}
          {Math.round((relaxes2 / counts2) * 100)}% des bureaux.
        </div>
        <div style={{ width: '100%', height: 300 }} className="mb-5">
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={datas2}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#1f2424' }} />
              <Bar dataKey="gnouf" stackId="a" fill="#b20000" />
              <Bar dataKey="relaxe" stackId="a" fill="#1abc9c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h1 className="title mt-4">Saison 3</h1>
        <div className="subtitle mt-1 mb-0">
          Le juge a traité en moyenne {Math.round(counts3 / datas3.length)}{' '}
          bureaux par audience.
        </div>
        <div className="subtitle mt-0 mb-2">
          Dans sa clémence, le juge a relaxé{' '}
          {Math.round((relaxes3 / counts3) * 100)}% des bureaux.
        </div>
        <div style={{ width: '100%', height: 300 }} className="mb-5">
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={datas3}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#1f2424' }} />
              <Bar dataKey="coupable" stackId="a" fill="#b20000" />
              <Bar dataKey="gnouf" stackId="a" fill="#b20000" />
              <Bar dataKey="epreuve" stackId="a" fill="#b25000" />
              <Bar dataKey="rappel" stackId="a" fill="#1aaaac" />
              <Bar dataKey="relaxe" stackId="a" fill="#1abc9c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}
