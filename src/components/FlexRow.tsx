import React from "react";

interface FlexRowProps {
    children: React.ReactNode;
    className?: string;
}
function FlexRow({ children, className = "" }: FlexRowProps) {
    return <div className={`flex ${className ? className : ""}`}>{children}</div>;
}

export default FlexRow;
