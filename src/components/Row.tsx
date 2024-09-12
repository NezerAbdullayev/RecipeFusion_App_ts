import { CommonProps } from "../types/common";

function Row({ children, className = "" }: CommonProps) {
    return <div className={className ? className : ""}>{children}</div>;
}

export default Row;
