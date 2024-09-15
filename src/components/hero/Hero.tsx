import FlexCol from "../FlexCol";
import Row from "../Row";
import Section from "../Section";

function Hero() {
    return (
        <Row className="h-[100vh] w-full bg-[url('/src/assets/bg.png')] bg-cover bg-center">
            <Section>
                <FlexCol className="h-full items-center gap-4  sm:gap-8 justify-center text-stone-50 font-mono">
                    <Row className="xl:text-3xl text-xl text-center ">Azərbaycanda ən gözəl yemək və cofe çeşidlətinin dadını baxın.</Row>

                    <Row className="text-4xl">XOŞ GƏLMİSİNİZ</Row>
                </FlexCol>
            </Section>
        </Row>
    );
}

export default Hero;
