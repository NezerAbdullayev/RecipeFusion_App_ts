import { CommonProps } from "./types/common";

function FlexCol({ children, className = "" }: CommonProps) {
    return <div className={`flex flex-col ${className ? className : ""}`}>{children}</div>;
}

export default FlexCol;
