import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, Label} from 'reactstrap'
import Chart from "react-apexcharts"
import {getSensorData} from "../services/sensorService"
import {useEffect, useState} from "react"
import RealtimeStats from "../@core/components/realtimeStats"
import icnNitrogen from '@src/assets/images/icons/icons8-nitrogen-64.png'
import icnPhosphorus from '@src/assets/images/icons/icons8-phosphorus-64.png'
import icnPotassium from '@src/assets/images/icons/icons8-potassium-64.png'
import icnTemperature from '@src/assets/images/icons/icons8-temperature-50.png'
import icnHumidity from '@src/assets/images/icons/icons8-humidity-48.png'
import icnPh from '@src/assets/images/icons/icons8-ph.png'
import icnRainfall from '@src/assets/images/icons/icons8-rainfall-48.png'
import {lineChartOptions} from "../@core/components/widgets/stats/ChartOptions"
import moment from "moment"
import {roundValues} from "../utility/Utils"

const initialData = {
    n: [],
    p: [],
    k: [],
    temperature: [],
    humidity: [],
    ph: []
}
const Home = () => {
    const [sensorData, setSensorData] = useState(initialData)
    const [dateList, setDateList] = useState([])
    const [counter, setCounter] = useState(5)

    const loadData = async () => {
        const res = await getSensorData()
        if (res?.data) {
            const n = []
            const p = []
            const k = []
            const temperature = []
            const humidity = []
            const ph = []
            const dates = []

            res.data.feeds.map((item, i) => {
                n.push(roundValues(item.field1))
                p.push(roundValues(item.field2))
                k.push(roundValues(item.field3))
                if (i === (res.data.feeds.length - 1)) temperature.push(roundValues(item.field4))
                humidity.push(roundValues(item.field5))
                if (i === (res.data.feeds.length - 1)) ph.push(roundValues(item.field6))

                dates.push(item?.created_at ? moment(item.created_at).format('HH:mm:ss') : '')
            })

            setSensorData({...sensorData, n, p, k, temperature, humidity, ph})
            setDateList(dates)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(async () => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            await loadData()
            setTimeout(() => {
                setCounter(5)
            }, 2000)
        }
    }, [counter])

    const chartOptions = {
        chart: {
            height: 350,
            type: "line",
            stacked: false,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true
        },
        colors: ["#0E9373", "#1C60D5", "#EA8D00"],
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        },
        xaxis: {
            categories: dateList
        },
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        }
    }

    const chartNSeries = [
        {
            name: 'Nitrogen',
            data: sensorData.n,
            title: 'ddd'
        },
        {
            name: 'Phosphorus',
            data: sensorData.p
        },
        {
            name: 'Potassium',
            data: sensorData.k
        }
    ]

    const temperatureOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -10
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: '#000',
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: (val) => {
                            return `${val} °C`
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            colors: ['#0E9373'],
            gradient: {
                gradientToColors: ['#ff5e62'],
                stops: [0, 150],
                inverseColors: true
            }
        },
        stroke: {
            dashArray: 4
        },
        labels: ['Temperature']
    }

    const phOptions = {
        chart: {
            height: 350,
            type: 'radialBar'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '40%'
                },
                dataLabels: {
                    value: {
                        formatter: (val) => {
                            return val
                        }
                    }
                }
            }
        },
        labels: ['Ph']
    }

    return (<Row>
            <Col md={7}>
                <Card>
                    <CardHeader className={'border-bottom mb-2 d-flex justify-content-between'}>
                        <CardTitle>Sensor Data History</CardTitle>
                        <div className={'font-weight-bold'}>
                            <span style={{color: 'red'}}>{counter} </span>
                            Refresh after second{counter > 1 ? 's' : ''}!
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Chart options={chartOptions} series={chartNSeries}/>
                    </CardBody>
                </Card>
            </Col>

            <Col md={5}>
                <Row>
                    <Col md={12}>
                        <RealtimeStats
                            data={[
                                {
                                    title: 'Nitrogen',
                                    value: sensorData.n[9] ?? 0,
                                    color: 'success',
                                    icon: icnNitrogen
                                },
                                {
                                    title: 'Phosphorus',
                                    value: sensorData.p[9] ?? 0,
                                    color: 'info',
                                    icon: icnPhosphorus
                                },
                                {
                                    title: 'Potassium',
                                    value: sensorData.k[9] ?? 0,
                                    color: 'warning',
                                    icon: icnPotassium
                                },
                                {
                                    title: 'Humidity',
                                    value: sensorData.humidity[9] ?? 0,
                                    color: 'info',
                                    icon: icnHumidity
                                },
                                {
                                    title: 'Rainfall',
                                    value: sensorData.humidity[9] ?? 0,
                                    color: 'info',
                                    icon: icnRainfall
                                }
                            ]}
                        />
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Chart options={temperatureOptions} type="radialBar" height={250}
                                   series={sensorData.temperature}/>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Chart options={phOptions} type="radialBar" height={258}
                                   series={sensorData.ph}/>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Home
