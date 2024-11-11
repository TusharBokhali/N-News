import { useCallback, useState } from "react"
import newsCategoryList from "../Categories"

export const useNewsCategory = () => {
    const [newsCata,setNewsCata] = useState(newsCategoryList)
    const toggleNewsCategory = useCallback((id:number)=>{
        setNewsCata((preNewsCategories) => {
            return preNewsCategories.map((el,ind)=>{
                if(el.id === id)
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
        newsCata,
        toggleNewsCategory
    }
}