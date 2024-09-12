import Row from "../Row";
import FlexRow from "../FlexRow";
function Header() {
    return (
        <header>
            <FlexRow className=" justify-around">
                {/* logo */}
                <Row>RecipeFusion</Row>

                {/* favorites and  search product input */}
                <Row>
                    <Row>favorites</Row>
                    <Row>search</Row>
                </Row>
                
            </FlexRow>
        </header>
    );
}

export default Header;
