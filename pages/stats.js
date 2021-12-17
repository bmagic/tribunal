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
        map[index]['ratio'] = Math.round((map[index].coupable / (map[index].coupable + map[index].relaxe)) * 100)
        data.push(map[index])

        if (map[index].gnouf !== 0 || map[index].epreuve !== 0 || map[index].rappel !== 0)
            data2.push(map[index])
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
            <div style={{ width: '100%', height: 300 }} className='mb-6'>

                <ResponsiveContainer >
                    <ComposedChart
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

                        <YAxis yAxisId="left" />
                        <YAxis
                            yAxisId="right"
                            type="number"
                            dataKey="ratio"
                            name="pourcent"
                            unit="%"
                            orientation="right"
                            stroke="#82ca9d"
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2424' }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="coupable" stackId="a" fill="#b20000" />
                        <Bar yAxisId="left" dataKey="relaxe" stackId="b" fill="#1abc9c" />
                        <Line yAxisId="right" type="monotone" dataKey="ratio" stroke="#8884d8" activeDot={{ r: 8 }} />

                    </ComposedChart>
                </ResponsiveContainer>

            </div>
            <div style={{ width: '100%', height: 300 }} className="mb-5">

                <ResponsiveContainer >
                    <BarChart
                        width={500}
                        height={300}
                        data={data2}
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
                        <Legend />
                        <Bar dataKey="gnouf" stackId="a" fill="#b20000" />
                        <Bar dataKey="epreuve" stackId="b" fill="#b25000" />
                        <Bar dataKey="rappel" stackId="c" fill="#1aaaac" />
                        <Bar dataKey="relaxe" stackId="d" fill="#1abc9c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </main >
}