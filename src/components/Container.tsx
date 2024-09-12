import React from "react";
import Row from "./Row";

interface ContainerProps {
    children: React.ReactNode;
}
function Container({ children }: ContainerProps) {
    return <Row className="h-auto w-screen bg-stone-50">{children}</Row>;
}

export default Container;
