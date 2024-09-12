// import outlet
import { Outlet } from "react-router";

import Container from "./Container";
import Header from "./header/Header";
import Main from "./Main";
import Footer from "./footer/Footer";

function AppLayout() {
    return (
        <Container>
            <Header />

            <Main>
                <Outlet />
            </Main>

            <Footer />
        </Container>
    );
}

export default AppLayout;
