import { Card, Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { deletePortfolioItem } from "../../../../services/user";
import { fetchUserPortfolio } from "../../../../redux/User/userSlice";
import { dateFormatter } from "../../../../services/timeFormatter";


const PortfolioItem = (props) => {

    const {
        id,
        title,
        company,
        startDate,
        endDate,
        description,
        fetchUserPortfolio
    } = props;

    return (
        <Card className="mb-3">
            <Card.Header>
                <Row>
                    <Col>
                        {company}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="danger" onClick={() => {
                            const confirmBox = window.confirm("Are you sure?")
                            if (confirmBox === true) {
                                deletePortfolioItem(id)
                                    .then(fetchUserPortfolio);
                            }
                        }} >Remove</Button>

                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>Title: {title}</Card.Text>
                <Card.Text>{dateFormatter(startDate)} -- {dateFormatter(endDate)}</Card.Text>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchUserPortfolio: () => dispatch(fetchUserPortfolio())
    }
};
//
export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);
// export default PortfolioItem;