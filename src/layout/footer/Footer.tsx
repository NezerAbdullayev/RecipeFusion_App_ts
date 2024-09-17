import { Row, Col } from "antd";
import "./footer.css";

function Footer() {
    return (
        <Row className="background-container">
            <Row gutter={16} justify="center" align="middle">
                <Col span={8}>
                    <Row gutter={16} justify="center" align="middle">
                        <Col span={24}>Location</Col>
                        <Col span={24}>+1 1234567890</Col>
                        <Col span={24}>recipeFusion@gmail.com</Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={24}>Lorem ipsum</Col>
                        <Col span={24}>Lorem ipsum</Col>
                        <Col span={24}>Lorem ipsum</Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <div>Opening Hours</div>
                        </Col>
                        <Col span={24}>
                            <div>Everyday</div>
                        </Col>
                        <Col span={24}>
                            <div>10.00 Am -10.00 Pm</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    );
}

export default Footer;
