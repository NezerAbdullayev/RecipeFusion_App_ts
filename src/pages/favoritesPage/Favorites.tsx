import React, { useState } from "react";

const Favorites: React.FC = () => {
    const [favoritesData,setFavoritesData]=useState<string[]>([])


    const deleteFavorites=()=>{
        setFavoritesData(favoritesData)
    }

    return (
        <div onClick={deleteFavorites}>
            <div></div>
        </div>
    );
};
export default Favorites;
