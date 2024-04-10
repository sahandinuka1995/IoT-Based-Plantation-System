import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, FormGroup, Label, Button} from 'reactstrap'
import {useEffect, useState} from "react"
import {plansResultSteps} from '@consts/consts'
import {Search} from "react-feather"
import '../assets/scss/custom-styles.scss'
import icnLoader from '@src/assets/images/loader.gif'
import {getPrediction} from "../services/predictService"
import {PLANT_IMG_LIST} from "../consts/consts"

const PlantFinder = () => {
    const [steps, setSteps] = useState(plansResultSteps.FIND)
    const [loader, setLoader] = useState(false)
    const [result, setResult] = useState(null)

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

    return (
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
                            {(steps === plansResultSteps.RESULT && !loader) &&
                                <div className={'d-flex justify-content-center p-2'}>
                                    <Row className={'border p-2 mb-2 align-items-center'}
                                         style={{maxWidth: 800, borderRadius: 6}}>
                                        <Col md={3}>
                                            <div align={'center'}>
                                                <img src={PLANT_IMG_LIST[result.name.toLowerCase()]} width={100}/>
                                                <h4 className={'text-primary mt-1'}>{result.name}</h4>
                                            </div>
                                        </Col>

                                        <Col md={9}>
                                            <p>{result.description}</p>
                                        </Col>
                                    </Row>
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
                                    <Button color={'primary'} onClick={() => {
                                        setSteps(plansResultSteps.FIND)
                                    }}>Find Again</Button>
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
    )
}

export default PlantFinder
