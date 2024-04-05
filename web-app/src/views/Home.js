import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col} from 'reactstrap'

const Home = () => {
    return (
        <div>
            <Card>
                <CardHeader className={'border-bottom mb-2'}>
                    <CardTitle>Realtime Feeds</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <Row>
                            <Col md={6}>
                                <iframe
                                    width="100%" height="260"
                                    style={{border: "1px solid #cccccc"}}
                                    src="https://thingspeak.com/channels/2412416/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
                            </Col>

                            <Col md={6}>
                                <iframe
                                    width="100%" height="260"
                                    style={{border: "1px solid #cccccc"}}
                                    src="https://thingspeak.com/channels/2412416/charts/2?bgcolor=%23ffffff&color=%23d62020&results=60&title=Phosphorus+%28P%29"></iframe>
                            </Col>

                            <Col md={5}>
                                <iframe
                                    width="100%" height="260"
                                    style={{border: "1px solid #cccccc"}}
                                    src="https://thingspeak.com/channels/2412416/charts/3?bgcolor=%23ffffff&color=%23d62020&results=60&title=Potassium+%28K%29"></iframe>
                            </Col>

                            <Col md={4}>
                                <iframe
                                    width="100%" height="260"
                                    style={{border: "1px solid #cccccc"}}
                                    src="https://thingspeak.com/channels/2412416/widgets/791350"></iframe>
                            </Col>
                        </Row>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default Home
