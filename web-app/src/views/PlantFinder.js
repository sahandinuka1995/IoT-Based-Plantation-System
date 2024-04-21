import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Button, Label} from 'reactstrap'
import {useEffect, useRef, useState} from "react"
import {plansResultSteps} from '@consts/consts'
import {Search} from "react-feather"
import '../assets/scss/custom-styles.scss'
import icnLoader from '@src/assets/images/loader.gif'
import {getPrediction} from "../services/predictService"
import {PLANT_IMG_LIST} from "../consts/consts"
import {getSensorDataCommon} from "../utility/Utils"
import {toPng} from 'html-to-image'

const initialData = {
    n: [],
    p: [],
    k: [],
    temperature: [],
    humidity: [],
    ph: []
}

const PlantFinder = () => {
    const elementRef = useRef(null)
    const [steps, setSteps] = useState(plansResultSteps.FIND)
    const [loader, setLoader] = useState(false)
    const [result, setResult] = useState(null)
    const [counter, setCounter] = useState(5)
    const [sensorData, setSensorData] = useState(initialData)

    const loadData = async () => {
        const res = await getSensorDataCommon()
        if (res) {
            setSensorData({...sensorData, ...res})
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

    const onPredict = async () => {
        const res = await getPrediction()
        if (res.status === 200) {
            await setResult(res.data)
            await setSteps(plansResultSteps.RESULT)
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
        <Row className={'justify-content-between'}>
            <Col md={2} lg={1}>
                <Card className={'p-1'}>
                    <Label><b>N:</b> {sensorData?.n[9]}</Label>
                </Card>
            </Col>

            <Col md={2} lg={1}>
                <Card className={'p-1'}>
                    <Label><b>P:</b> {sensorData?.p[9]}</Label>
                </Card>
            </Col>

            <Col md={2} lg={1}>
                <Card className={'p-1'}>
                    <Label><b>K:</b> {sensorData?.k[9]}</Label>
                </Card>
            </Col>

            <Col md={6} lg={2}>
                <Card className={'p-1'}>
                    <Label><b>Temperature:</b> {sensorData?.temperature[9]}</Label>
                </Card>
            </Col>

            <Col md={4} lg={2}>
                <Card className={'p-1'}>
                    <Label><b>Humidity:</b> {sensorData?.humidity[9]}</Label>
                </Card>
            </Col>

            <Col md={4} lg={2}>
                <Card className={'p-1'}>
                    <Label><b>Rainfall:</b> 52</Label>
                </Card>
            </Col>

            <Col md={4} lg={2}>
                <Card className={'p-1'}>
                    <Label><b>Ph:</b> {sensorData?.ph[9]}</Label>
                </Card>
            </Col>
        </Row>

        <Card>
            <CardHeader className={'border-bottom'}>
                <CardTitle>
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
                         style={steps === plansResultSteps.FIND ? {
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                         } : {}}>
                        <CardText>
                            {(steps === plansResultSteps.RESULT && !loader) && <div align={'center'} ref={elementRef}>
                                <div className={'d-flex justify-content-center p-2'}>
                                    <Row className={'border p-2 align-items-center bg-white'}
                                         style={{maxWidth: 800, borderRadius: 6}}>
                                        <Col md={3}>
                                            <div align={'center'}>
                                                <img src={PLANT_IMG_LIST[result.name.toLowerCase()]} width={100}/>
                                                <h4 className={'text-primary mt-1'}>{result.name}</h4>
                                            </div>
                                        </Col>

                                        <Col md={9} align={'left'}>
                                            <p>{result.description}</p>
                                        </Col>
                                    </Row>
                                </div>

                                <p className={'text-white'}>www.agropulse.com</p>
                            </div>}

                            {(steps === plansResultSteps.FIND && !loader) &&
                                <div align={'center fade'} className={'mt-2'}>
                                    <div className={'btn-circle'}
                                         onClick={loaderHandler}>
                                        <Search size={15} style={{marginRight: 5}}/>
                                        Find Plant
                                    </div>
                                </div>}

                            {
                                (steps === plansResultSteps.RESULT && !loader) && <div align={'center'}>
                                    <Button color={'secondary'}
                                            onClick={() => {
                                                setSteps(plansResultSteps.FIND)
                                            }}
                                    >Find Again</Button>

                                    <Button color={'warning'}
                                            className={'ml-1'}
                                            onClick={htmlToImageConvert}
                                    >Save Result</Button>
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
