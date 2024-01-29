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

            <Card>
                <CardHeader>
                    <CardTitle>Want to integrate JWT? 🔒</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.
                    </CardText>
                    <CardText>
                        Please read our{' '}
                        <CardLink
                            href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/development/auth'
                            target='_blank'
                        >
                            JWT Documentation
                        </CardLink>{' '}
                        to get more out of JWT authentication.
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default Home
