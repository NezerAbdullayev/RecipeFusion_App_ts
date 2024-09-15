import { CommonProps } from "./types/common";

function FlexRow({ children, className = "" }: CommonProps) {
    return <div className={`flex ${className ? className : ""}`}>{children}</div>;
}

export default FlexRow;
