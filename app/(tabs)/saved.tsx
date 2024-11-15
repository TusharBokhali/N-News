import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { FlatList } from 'react-native';
import { NewsItem } from '@/components/NewsList';
import { useIsFocused } from '@react-navigation/native';

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews,setBookmarkNews] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [empty,setEmpty] = useState(false)
  useEffect(()=>{
    fetchBook();
  },[isFocused])

  const fetchBook = async () => {
    await AsyncStorage.getItem('bookmark').then(async(token) => {
      setIsLoading(true);
      const res = JSON.parse(token);
      if(res == ''){
        setIsLoading(false)
        setEmpty(true)
      }else{
        setEmpty(false)
        setIsLoading(true)
      }
      
      
      if(res){
        let query_String = res.join(',')
        
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&id=${query_String}`);
        setBookmarkNews(response.data.results)
        setIsLoading(false)
      } else{
        setBookmarkNews([]);
        setIsLoading(false);
      }
    }) 
  }
  // empty ? <View style={{flex:1,justifyContent:'center',}}><Text style={{textAlign:'center',}}>News not Saved !</Text></View> :

  return (
    <>
    <Stack.Screen options={{
      headerShown:true,
    }}/>
    <View style={styles.container}>
      {
        isLoading ? (
          <Loading size={'large'}/>
        ) : (empty ? <View style={{flex:1,justifyContent:'center',}}><Text style={{textAlign:'center',}}>News not Saved !</Text></View> :  (
          <FlatList data={bookmarkNews} keyExtractor={(_, index) => `list_item${index}`} showsVerticalScrollIndicator={false} renderItem={({ item, index }) => {
            return (
                <Link href={`/${item.article_id}`} asChild key={index}>
                    <TouchableOpacity>
                        <NewsItem el={item} />
                    </TouchableOpacity>
                </Link>
            )
        }} />
        ))
      }
    </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
   margin:20,
  },
})