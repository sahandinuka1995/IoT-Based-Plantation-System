import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, FormGroup, Label, Button} from 'reactstrap'
import icnNitrogen from '@src/assets/images/icons/icons8-nitrogen-64.png'
import icnPhosphorus from '@src/assets/images/icons/icons8-phosphorus-64.png'
import icnPotassium from '@src/assets/images/icons/icons8-potassium-64.png'
import icnTemperature from '@src/assets/images/icons/icons8-temperature-50.png'
import icnHumidity from '@src/assets/images/icons/icons8-humidity-48.png'
import icnPh from '@src/assets/images/icons/icons8-ph.png'
import icnRainfall from '@src/assets/images/icons/icons8-rainfall-48.png'
import icnMaize from '@src/assets/images/icons/plants/icons8-maize-96.png'
import {useState} from "react"
import {plansResultSteps} from '@consts/consts'
import {Search} from "react-feather"
import '../assets/scss/custom-styles.scss'
import {AnimateOnChange} from 'react-animation'
import icnLoader from '@src/assets/images/loader.gif'

const PlantFinder = () => {
    const [steps, setSteps] = useState(plansResultSteps.FIND)
    const [loader, setLoader] = useState(false)

    const loaderHandler = () => {
        setLoader(true)
        setTimeout(async () => {
            await setLoader(false)
            await setSteps(plansResultSteps.RESULT)
        }, 3000)
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
                    <Col md={6}>
                        <CardText>
                            <h4>Environment Information</h4>
                        </CardText>
                        <CardText>
                            <div className={'border p-2'}>
                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnNitrogen} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>Nitrogen (N): </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>

                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnPhosphorus} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>Phosphorus (P): </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>

                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnPotassium} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>Potassium (K): </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>

                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnTemperature} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>Temperature: </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>

                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnHumidity} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>Humidity: </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>

                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnPh} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>pH: </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>

                                <FormGroup className={'d-flex align-items-center'}>
                                    <img src={icnRainfall} width={30}/>
                                    <h4 className={'mr-1 mb-0 ml-1'}>Rainfall: </h4>
                                    <h4 className={'mb-0'}>34%</h4>
                                </FormGroup>
                            </div>
                        </CardText>
                    </Col>
                    <Col md={6}
                         style={steps === plansResultSteps.FIND ? {
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                         } : {}}>
                        <CardText>
                            {(steps === plansResultSteps.RESULT && !loader) && <h4>Result</h4>}
                        </CardText>
                        <CardText>
                            {(steps === plansResultSteps.RESULT && !loader) && <div className={'border p-2 mb-2'}>
                                <div align={'center'}>
                                    <img src={icnMaize} width={100}/>
                                    <h4 className={'text-primary'}>Grapes</h4>
                                </div>
                                <p>Grapes are the ideal choice for these environmental conditions, thriving perfectly to
                                    provide abundant and quality produce.</p>
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
