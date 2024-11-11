import { useCallback, useState } from "react"
import newsCategoryList from "../Categories"
import CountryList from "../CountryList"

export const useNewsCountry = () => {
    const [newsCountry,setNewsCountry] = useState(CountryList)
    const toggleNewsCountry = useCallback((id:number)=>{
        setNewsCountry((preNewsCategories) => {
            return preNewsCategories.map((el,ind)=>{
                if(ind === id)
                {
                    return {
                        ...el,
                        selected: !el.selected
                    }
                }
                return el;
            })
        });
    },[])

    return {
        newsCountry,
        toggleNewsCountry
    }
}