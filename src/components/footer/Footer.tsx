// import FooterImg from "../../assets/image.png";
import FlexCol from "../FlexCol";
import FlexRow from "../FlexRow";
import Row from "../Row";

function Footer() {
    return (
        <footer className="h-[45vh] bg-[url('/src/assets/image.png')] bg-center sm:bg-cover md:h-[80vh]">
            <FlexCol className="mx-auto h-full max-w-[700px] items-center justify-center gap-5 text-white  sm:w-[50%] sm:items-start">
                <FlexRow className="w-full cursor-pointer justify-center gap-5 sm:justify-between">
                    <Row>ipsum Lorem</Row>
                    <Row>Lorem ipsum </Row>
                    <Row>Lorem ipsum </Row>
                </FlexRow>

                <FlexRow className="w-full cursor-pointer justify-center gap-5 sm:justify-between">
                    <Row>Lorem ipsum </Row>
                    <Row>Lorem ipsum </Row>
                    <Row>Lorem ipsum </Row>
                </FlexRow>

                <FlexRow className="w-full cursor-pointer justify-center gap-5 sm:justify-between">
                    <Row>Lorem ipsum </Row>
                    <Row>Lorem ipsum </Row>
                    <Row>Lorem ipsum </Row>
                </FlexRow>
            </FlexCol>
        </footer>
    );
}

export default Footer;
