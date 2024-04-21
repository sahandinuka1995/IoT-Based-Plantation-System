import {Card, CardHeader, CardBody, CardTitle, Row, Col} from 'reactstrap'
import Chart from "react-apexcharts"
import {useEffect, useState} from "react"
import RealtimeStats from "../@core/components/realtimeStats"
import icnNitrogen from '@src/assets/images/icons/icons8-nitrogen-64.png'
import icnPhosphorus from '@src/assets/images/icons/icons8-phosphorus-64.png'
import icnPotassium from '@src/assets/images/icons/icons8-potassium-64.png'
import icnHumidity from '@src/assets/images/icons/icons8-humidity-48.png'
import icnRainfall from '@src/assets/images/icons/icons8-rainfall-48.png'
import {getSensorDataCommon} from "../utility/Utils"
import {getRainfallData} from "../services/sensorService"

const initialData = {
    n: [],
    p: [],
    k: [],
    temperature: [],
    humidity: [],
    ph: [],
    rainfall: 0
}

const Home = () => {
    const [sensorData, setSensorData] = useState(initialData)
    const [dateList, setDateList] = useState([])
    const [counter, setCounter] = useState(5)

    const loadData = async () => {
        const res = await getSensorDataCommon(true)
        if (res) {
            setSensorData({...sensorData, ...res})
            setDateList(res.dates)
        }
    }

    const loadRainfall = async () => {
        const sensorRes = await getSensorDataCommon(true)
        const res = await getRainfallData()
        const rainfall = res?.data?.clouds?.all
        if (res) setSensorData({...sensorRes, rainfall: rainfall > 10 ? Number.parseInt(rainfall / 10) - 4 : 2})
    }

    useEffect(() => {
        loadRainfall()
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
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0
        },
        chart: {
            height: 350,
            type: "line",
            stacked: false,
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#0E9373", "#1C60D5", "#EA8D00", "#F10B2F"],
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
            data: sensorData.n
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
                                    value: `${sensorData.rainfall ?? 0} mm`,
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
