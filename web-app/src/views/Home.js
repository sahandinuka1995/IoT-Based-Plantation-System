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

const initialData = {
    _n: 0,
    _p: 0,
    _k: 0,
    _temperature: [0],
    _humidity: 0,
    _ph: [0],
    _rainfall: 0
}

const Home = () => {
    const [sensorData, setSensorData] = useState(initialData)
    const [sensorDataList, setSensorDataList] = useState(null)
    const [dateList, setDateList] = useState([])
    const [counter, setCounter] = useState(5)

    const loadData = async () => {
        const res = await getSensorDataCommon()
        if (res) {
            setSensorData({...sensorData, ...res.currentData})
            setSensorDataList({
                n: res.n,
                p: res.p,
                k: res.k,
                humidity: res.humidity,
                rainfall: res.rainfall,
                temperature: res.temperature,
                ph: res.ph
            })
            setDateList(res.dates)
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
        colors: [
            "#FF6F61",
            "#6B5B95",
            "#88B04B",
            "#29AC8D",
            "#92A8D1",
            "#955251",
            "#1976D2"
        ],
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
            data: sensorDataList?.n ?? []
        },
        {
            name: 'Phosphorus',
            data: sensorDataList?.p ?? []
        },
        {
            name: 'Potassium',
            data: sensorDataList?.k ?? []
        },
        {
            name: 'Humidity',
            data: sensorDataList?.humidity ?? []
        },
        {
            name: 'Rainfall',
            data: sensorDataList?.rainfall ?? []
        },
        {
            name: 'Temperature',
            data: sensorDataList?.temperature ?? []
        },
        {
            name: 'Ph',
            data: sensorDataList?.ph ?? []
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
                                    value: `${sensorData._n ?? 0} mg`,
                                    color: 'success',
                                    icon: icnNitrogen
                                },
                                {
                                    title: 'Phosphorus',
                                    value: `${sensorData._p ?? 0} mg`,
                                    color: 'info',
                                    icon: icnPhosphorus
                                },
                                {
                                    title: 'Potassium',
                                    value: `${sensorData._k ?? 0} mg`,
                                    color: 'warning',
                                    icon: icnPotassium
                                },
                                {
                                    title: 'Humidity',
                                    value: `${sensorData._humidity ?? 0} %`,
                                    color: 'info',
                                    icon: icnHumidity
                                },
                                {
                                    title: 'Rainfall',
                                    value: `${sensorData._rainfall ?? 0} mm`,
                                    color: 'info',
                                    icon: icnRainfall
                                }
                            ]}
                        />
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Chart options={temperatureOptions} type="radialBar" height={250}
                                   series={[sensorData._temperature]}/>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Chart options={phOptions} type="radialBar" height={258}
                                   series={[sensorData._ph]}/>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Home
