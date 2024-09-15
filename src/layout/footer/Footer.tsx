import { Row, Col } from "antd";
import "./footer.css";

function Footer() {
    return (
        <Row className="background-container">
            <Row gutter={16} justify="center" align="middle">
                <Col span={8}>
                    <Row gutter={16} justify="center" align="middle">
                        <Col span={24}>Lorem ipsum</Col>
                        <Col span={24}>Lorem ipsum</Col>
                        <Col span={24}>Lorem ipsum</Col>
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
                            <div>Lorem ipsum</div>
                        </Col>
                        <Col span={24}>
                            <div>Lorem ipsum</div>
                        </Col>
                        <Col span={24}>
                            <div>Lorem ipsum</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    );
}

export default Footer;
