import React from "react";

interface MainProps {
    children: React.ReactNode;
}

function Main({ children }: MainProps) {
    return <main className="mt-[56px] sm:mt-[64px]">{children}</main>;
}

export default Main;
