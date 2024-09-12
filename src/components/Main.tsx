import React from "react"

interface  MainProps{
    children: React.ReactNode;
}

function Main({children}:MainProps) {
    return (
        <main>
            {children}
        </main>
    )
}

export default Main
