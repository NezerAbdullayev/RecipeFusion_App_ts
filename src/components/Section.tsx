import { CommonProps } from "../types/common";

function Section({ children, className = "" }: CommonProps) {
    return (
        <section className={`h-full w-full ${className ? className : ""}`}>
            <div className="mx-auto h-full w-[1440px] max-w-[90%]">{children}</div>
        </section>
    );
}

export default Section;
