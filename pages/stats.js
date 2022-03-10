import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import Header from "../components/Header"
import json from '../public/data.json'

export default function Stats() {
    const data = [];
    const data2 = [];

    const map = {}
    let relaxe = 0
    for (const emissionIndex in json.emission) {

        map[(parseInt(emissionIndex) + 1)] = {
            name: json.emission[emissionIndex].date,
            coupable: 0,
            relaxe: 0,
            gnouf: 0,
            epreuve: 0,
            rappel: 0
        }

    }
    for (const desktop of json.desktop) {
        if (desktop.jugement === 'coupable') {
            map[desktop.emission].coupable++
            switch (desktop.sanction) {
                case 'gnouf':
                    map[desktop.emission].gnouf++
                    break
                case 'epreuve':
                    map[desktop.emission].epreuve++
                    break
                case 'rappel':
                    map[desktop.emission].rappel++
                    break
            }
        } else {
            relaxe++

            map[desktop.emission].relaxe++
        }
    }
    for (const index in map) {


        if (map[index].gnouf !== 0 || map[index].epreuve !== 0 || map[index].rappel !== 0)
            delete map[index].coupable
        else {

            delete map[index].gnouf
            delete map[index].epreuve
            delete map[index].rappel
        }
        data.push(map[index])

    }


    return <main >
        <Header />
        <div className="container has-text-centered">
            <h2 className="title mt-6">
                Le juge traite en moyenne {Math.round(json.desktop.length / json.emission.length)} bureaux par audience.
            </h2>
            <h2 className="title mt-6">
                Dans sa clémence, le juge a relaxé {Math.round((relaxe / json.desktop.length) * 100)}% des bureaux.
            </h2>
            <div style={{ width: '100%', height: 300 }} className="mb-5">

                <ResponsiveContainer >
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
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
    </main >
}