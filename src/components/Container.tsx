import React from 'react';
import Row from './Row';

interface ContainerProps {
    children: React.ReactNode;
}
function Container({ children }: ContainerProps) {
    return (
        <Row className="h-auto w-screen">
            <Row className="mx-auto w-[1440px] max-w-[90%]">{children}</Row>
        </Row>
    );
}

export default Container;
