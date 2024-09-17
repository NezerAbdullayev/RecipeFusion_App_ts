import React from"react" 
import { useGetAllMealCategoryQuery } from "../redux/services/mealApi"

const useFiltersData:React.FC=()=>{
    // meal Category name data
    const {data,error,isLoading}=useGetAllMealCategoryQuery()

    




    return "he.lo"
}

export {useFiltersData}