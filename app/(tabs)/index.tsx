import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import Breaking from '@/components/Breaking'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'

type Props = {}

const Page = (props: Props) => {

  const [news,setNews] = useState<NewsDataType[]>([]);
  const [Getnews,setAddNews] = useState<NewsDataType[]>([]);
  const [isLoading,setLoading] = useState(true);
  useEffect(()=>{
    getBreakingNews();
    getNews();
  },[])

  const getBreakingNews = async() =>{
    try{
        // const URL =`https://newsdata.io/api/1/news?apikey=pub_58190849134dea2a1059428616e31663bbb8d&country=in&language=en&image=1&removeduplicate=1&size=5`
        const URL =`https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&country=in&language=en&image=1&removeduplicate=1&size=5`
        const res = await axios.get(URL)

        
        if(res && res.data){
          setNews(res.data.results)
          setLoading(false)
        }
    }catch(e){
      console.log(e);
    }
  }

  const getNews = async(category:string = '') =>{
    try{
      let categoryString = '';
      if(category.length !== 0){
        categoryString = `&category=${category}`
      }
      
        const URL =`https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}`
        const res = await axios.get(URL)
        
        if(res && res.data){
          setAddNews(res.data.results)
          setLoading(false)
        }
    }catch(e){
      console.log(e);
    }
  }


  const onChanged = (categories:string)=>{
    setAddNews([])
    getNews(categories);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

         <Header />
         <SearchBar withHorizontalPadding={true}/>
         {
           isLoading ? (
             <Loading size={'large'}/>
            ):(
              <Breaking newsList={news}/>
            )}
        <Categories onCategoryChanged={onChanged}/>
        <NewsList newsList={Getnews}/>
            </ScrollView>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})