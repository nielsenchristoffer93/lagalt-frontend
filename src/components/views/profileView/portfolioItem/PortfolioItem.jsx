import {Card} from "react-bootstrap";

const PortfolioItem = ({title, company, date, description}) => {
    return (
        <Card className="mb-3">
            <Card.Header>{company}</Card.Header>
                <Card.Body>
                    <Card.Text>Title: {title}</Card.Text>
                    <Card.Text>{date}</Card.Text>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
        </Card>
    )
}

export default PortfolioItem;