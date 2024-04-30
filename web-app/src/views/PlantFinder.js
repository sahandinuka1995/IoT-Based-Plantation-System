import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Button, Label, FormGroup} from 'reactstrap'
import {useEffect, useRef, useState} from "react"
import {plansResultSteps} from '@consts/consts'
import {Search} from "react-feather"
import '../assets/scss/custom-styles.scss'
import icnLoader from '@src/assets/images/loader.gif'
import {getPrediction} from "../services/predictService"
import {LOCATIONS, PLANT_IMG_LIST, PREDICTION_MODE} from "../consts/consts"
import {getSensorDataCommon, requestLocation, selectThemeColors} from "../utility/Utils"
import {toPng} from 'html-to-image'
import moment from "moment/moment"
import Select from "react-select"

const initialData = {
    _n: 0,
    _p: 0,
    _k: 0,
    _temperature: 0,
    _humidity: 0,
    _ph: 0,
    _rainfall: 0
}

const PlantFinder = () => {
    const elementRef = useRef(null)
    const [steps, setSteps] = useState(plansResultSteps.FIND)
    const [loader, setLoader] = useState(false)
    const [result, setResult] = useState(null)
    const [envInfo, setEnvInfo] = useState(null)
    const [counter, setCounter] = useState(5)
    const [sensorData, setSensorData] = useState(initialData)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [mode, setMode] = useState(PREDICTION_MODE.AUTO)
    const [location, setLocation] = useState(null)

    const loadData = async () => {
        const res = await getSensorDataCommon()
        if (res) {
            setSensorData({...sensorData, ...res.currentData})
        }
    }

    const requireLocation = async () => {
        const res = await requestLocation()
        if (res) setLocation(res)
    }

    useEffect(async () => {
        requireLocation()
    }, [])

    // useEffect(async () => {
    //     if (counter > 0) {
    //         const timer = setTimeout(() => setCounter(counter - 1), 1000)
    //         return () => clearTimeout(timer)
    //     } else {
    //         await loadData()
    //         setTimeout(() => {
    //             setCounter(5)
    //         }, 2000)
    //     }
    // }, [counter])

    const onPredict = async () => {
        const res = await getPrediction(location)
        if (res.status === 200) {
            await setEnvInfo(res?.data?.sensorData)
            await setResult(res?.data?.predictionResult)
            await setSteps(plansResultSteps.RESULT)
            await setDate(moment().format('yyyy-MM-DD'))
            await setTime(moment().format('HH:mm'))
        }
    }

    const loaderHandler = () => {
        setLoader(true)
        setTimeout(async () => {
            await setLoader(false)
            //await setSteps(plansResultSteps.RESULT)
            await onPredict()
        }, 1000)
    }

    const htmlToImageConvert = () => {
        toPng(elementRef.current, {cacheBust: false})
            .then((dataUrl) => {
                const link = document.createElement("a")
                link.download = "prediction-result-agropulse.png"
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (<>
        {/*<Row className={'justify-content-between'}>*/}
        {/*    <Col md={2} lg={1}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>N:</b> {sensorData?.n ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}

        {/*    <Col md={2} lg={1}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>P:</b> {sensorData?.p ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}

        {/*    <Col md={2} lg={1}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>K:</b> {sensorData?.k ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}

        {/*    <Col md={6} lg={2}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>Temperature:</b> {sensorData?.temperature ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}

        {/*    <Col md={4} lg={2}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>Humidity:</b> {sensorData?.humidity ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}

        {/*    <Col md={4} lg={2}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>Rainfall:</b> {sensorData?.rainfall ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}

        {/*    <Col md={4} lg={2}>*/}
        {/*        <Card className={'p-1'}>*/}
        {/*            <Label><b>Ph:</b> {sensorData?.ph ?? 0}</Label>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}
        {/*</Row>*/}

        <Card>
            <CardHeader className={'border-bottom'}>
                <CardTitle className={'w-100'}>
                    <b>Plant Finder</b>
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row className={'mt-2'}>
                    {/*<Col md={6}>*/}
                    {/*    <CardText>*/}
                    {/*        <div className={'border p-2'}>*/}
                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnNitrogen} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>Nitrogen (N): </h4>*/}
                    {/*                <h4 className={'mb-0'}>{sensorData?.n[9] ?? 0}</h4>*/}
                    {/*            </FormGroup>*/}

                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnPhosphorus} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>Phosphorus (P): </h4>*/}
                    {/*                <h4 className={'mb-0'}>{sensorData?.p[9] ?? 0}</h4>*/}
                    {/*            </FormGroup>*/}

                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnPotassium} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>Potassium (K): </h4>*/}
                    {/*                <h4 className={'mb-0'}>{sensorData?.k[9] ?? 0}</h4>*/}
                    {/*            </FormGroup>*/}

                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnTemperature} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>Temperature: </h4>*/}
                    {/*                <h4 className={'mb-0'}>{sensorData?.temperature[9] ?? 0}</h4>*/}
                    {/*            </FormGroup>*/}

                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnHumidity} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>Humidity: </h4>*/}
                    {/*                <h4 className={'mb-0'}>{sensorData?.humidity[9] ?? 0}</h4>*/}
                    {/*            </FormGroup>*/}

                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnPh} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>pH: </h4>*/}
                    {/*                <h4 className={'mb-0'}>{sensorData?.ph[9] ?? 0}</h4>*/}
                    {/*            </FormGroup>*/}

                    {/*            <FormGroup className={'d-flex align-items-center'}>*/}
                    {/*                <img src={icnRainfall} width={30}/>*/}
                    {/*                <h4 className={'mr-1 mb-0 ml-1'}>Rainfall: </h4>*/}
                    {/*                <h4 className={'mb-0'}>34%</h4>*/}
                    {/*            </FormGroup>*/}
                    {/*        </div>*/}
                    {/*    </CardText>*/}
                    {/*</Col>*/}
                    <Col md={12}
                        // style={steps === plansResultSteps.FIND ? {
                        //     display: 'flex',
                        //     justifyContent: 'center',
                        //     alignItems: 'center'
                        // } : {}}
                    >
                        <CardText>
                            {(steps === plansResultSteps.RESULT && !loader) &&
                                <div align={'center'} ref={elementRef}>
                                    {result ? <>
                                        <div className={'d-flex justify-content-center p-2'}>
                                            <Row className={'border p-2 align-items-center bg-white'}
                                                 style={{maxWidth: 800, borderRadius: 6}}>
                                                <Col md={3}>
                                                    <div align={'center'}>
                                                        <img src={PLANT_IMG_LIST[result.name.toLowerCase()]}
                                                             width={100}/>
                                                        <h4 className={'text-primary mt-1'}>{result.name}</h4>
                                                    </div>

                                                    <div className={'mt-2 border-bottom-cus mb-2 pb-2'}>
                                                        <Label
                                                            className={'d-block mb-0'}>Date: {date}</Label>
                                                        <Label className={'d-block'}>Time: {time}</Label>
                                                    </div>
                                                </Col>

                                                <Col md={9} align={'left'} className={'border-left-cus'}>
                                                    <p>{result.description}</p>

                                                    <div>
                                                        <b className={'d-block mb-1'}>Environmental Information</b>
                                                        <table>
                                                            <tbody>
                                                            <tr>
                                                                <td className={'pr-1'}>Nitrogen (N):</td>
                                                                <td>{envInfo?._n ?? 0} mm</td>
                                                            </tr>
                                                            <tr>
                                                                <td className={'pr-1'}>Potassium (P):</td>
                                                                <td>{envInfo?._p ?? 0} mm</td>
                                                            </tr>
                                                            <tr>
                                                                <td className={'pr-1'}>Phosphorus (K):</td>
                                                                <td>{envInfo?._k ?? 0} mm</td>
                                                            </tr>
                                                            <tr>
                                                                <td className={'pr-1'}>Temperature:</td>
                                                                <td>{envInfo?._temperature ?? 0} °C</td>
                                                            </tr>
                                                            <tr>
                                                                <td className={'pr-1'}>Humidity:</td>
                                                                <td>{envInfo?._humidity ?? 0} %</td>
                                                            </tr>
                                                            <tr>
                                                                <td className={'pr-1'}>Rainfall:</td>
                                                                <td>{envInfo?._rainfall ?? 0} mm</td>
                                                            </tr>
                                                            <tr>
                                                                <td className={'pr-1'}>Ph:</td>
                                                                <td>{envInfo?._ph ?? 0}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <p className={'text-white'}>
                                            This report was generated using AgroPulse | Developed by Sahan Dinuka
                                        </p>
                                    </> : <div className={'mb-2'}>No prediction found</div>}
                                </div>}

                            {(steps === plansResultSteps.FIND && !loader) &&
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label className={'d-block'}>Mode</Label>
                                            <Button color={'primary'}
                                                    className={'w-50'}
                                                    style={{borderRadius: '0.358rem 0 0 0.358rem'}}
                                                    outline={mode === PREDICTION_MODE.MANUAL}
                                                    onClick={() => {
                                                        setMode(PREDICTION_MODE.AUTO)
                                                        setLocation(null)
                                                    }}
                                            >
                                                Auto Mode
                                            </Button>

                                            <Button color={'primary'}
                                                    className={'w-50'}
                                                    style={{borderRadius: '0 0.358rem 0.358rem 0'}}
                                                    outline={mode === PREDICTION_MODE.AUTO}
                                                    onClick={() => {
                                                        setMode(PREDICTION_MODE.MANUAL)
                                                        setLocation(LOCATIONS[0])
                                                    }}
                                            >
                                                Manual Mode
                                            </Button>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Location</Label>
                                            <Select
                                                theme={selectThemeColors}
                                                className='react-select'
                                                classNamePrefix='select'
                                                defaultValue={LOCATIONS[0]}
                                                value={location}
                                                options={LOCATIONS}
                                                isClearable={false}
                                                onChange={setLocation}
                                                placeholder={'Select location'}
                                                isDisabled={mode === PREDICTION_MODE.AUTO}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <div align={'center fade'} className={'mt-2 d-flex justify-content-center'}>
                                            <div className={'btn-circle'}
                                                 onClick={loaderHandler}>
                                                <Search size={15} style={{marginRight: 5}}/>
                                                Find Plant
                                            </div>
                                        </div>
                                    </Col>
                                </Row>}

                            {
                                (steps === plansResultSteps.RESULT && !loader) && <div align={'center'}>
                                    <Button color={'secondary'}
                                            onClick={() => {
                                                setSteps(plansResultSteps.FIND)
                                            }}
                                    >Find Again</Button>

                                    {result && <Button color={'warning'}
                                                       className={'ml-1'}
                                                       onClick={htmlToImageConvert}
                                    >Save Result</Button>}
                                </div>
                            }
                        </CardText>

                        {
                            loader && <div align={'center'}>
                                <img src={icnLoader} alt=""/>
                            </div>
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>)
}

export default PlantFinder
