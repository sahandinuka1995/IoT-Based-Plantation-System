import React from "react"
import {Card, Col, Row} from "reactstrap"
import StatsHorizontal from "../widgets/stats/StatsHorizontal"

const RealtimeStats = (props) => {
    const {data} = props
    return <Row>
        {
            data.map((item, i) => <Col md={data.length % 2 === 0 ? 6 : (i === data.length - 1) ? 12 : 6} key={i}>
                <StatsHorizontal
                    statTitle={item.title}
                    stats={item.value}
                    color={item.color}
                    icon={<img src={item.icon} width={40}/>}
                />
            </Col>)
        }
    </Row>
}

export default RealtimeStats