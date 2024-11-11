import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import { FlatList } from 'react-native-gesture-handler';
import { NewsItem } from '@/components/NewsList';

export default function Search() {
    const { query, Category, Country } = useLocalSearchParams<{ query: string, Category: string, Country: string }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, [])

    const getNews = async (category: string = '') => {
        try {
            let categoryString = '';
            let CountryString = '';
            let queryString = '';
            if (category) {
                categoryString = `&category=${category}`
            }

            if (Country) {
                CountryString = `&country=${Country}`
            }

            if (query) {
                queryString = `&q=${query}`
            }
            
            // const URL = `https://newsdata.io/api/1/news?apikey=pub_58190849134dea2a1059428616e31663bbb8d&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}${CountryString}${queryString}`
               const URL = `https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}${CountryString}${queryString}`
            const res = await axios.get(URL)

            if (res && res.data) {
                setNews(res.data.results)
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22} />
                    </TouchableOpacity>
                ),
                title: "Search"
            }} />
            <View style={styles.container}>
                {
                    isLoading ? (
                        <Loading size={'large'} />
                    ) : (
                        <FlatList data={news} keyExtractor={(_, index) => `list_item${index}`} showsVerticalScrollIndicator={false} renderItem={({ el, ind }) => {
                            return (
                                <Link href={`/${el.article_id}`} asChild key={ind}>
                                    <TouchableOpacity>
                                        <NewsItem el={el} />
                                    </TouchableOpacity>
                                </Link>
                            )
                        }} />
                    )
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
    }
})