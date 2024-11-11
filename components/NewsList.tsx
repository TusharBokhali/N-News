import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors';
import Loading from './Loading';
import { Link } from 'expo-router';

type Props = {
    newsList: Array<NewsDataType>;
}

export default function NewsList({newsList}: Props) {
  return (
    <ScrollView style={styles.container}>
    {newsList.length == 0 ? (
        <Loading size={'large'}/>
    ):(
        newsList.map((el,ind)=>(
            <Link href={`/${el.article_id}`} asChild key={ind}> 
    <TouchableOpacity>
            <NewsItem el={el} />
            </TouchableOpacity>
            </Link>
        )))
    }
    </ScrollView>
  )
}

export const NewsItem = ({el}:{el:NewsDataType}) =>{
    return(
        <View  style={styles.ItemContent}>
        <Image source={{uri:el.image_url}} style={styles.itemImages}/>
        <View style={styles.itemAbout}>
            <Text style={styles.itemCate}>{el.category}</Text>
            <Text style={styles.ItemTitle}>{el.title}</Text>
            <View style={styles.SourceAbout}>
                <Image source={{uri:el.source_icon}} style={styles.SourceIcons}/>
                <Text style={styles.SourceName}>{el.source_name}</Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    ItemContent:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
        flex:1,
        gap:10,
    },
    itemImages:{
        width:90,
        height:100,
        borderRadius:20,
        marginRight:10,
    },
    itemAbout:{
        flex:1,
        gap:10,
        justifyContent:'space-between',
    },
    itemCate:{
        fontSize:12,
        color:Colors.darkGrey,
        textTransform:'capitalize',
    },
    ItemTitle:{
        fontSize:12,
        fontWeight:'600',
        color:Colors.black,
    },
    SourceAbout:{
        flexDirection:'row',
        gap:8,
        alignItems:'center',
    },
    SourceIcons:{
        width:20,
        height:20,
        borderRadius:20,
    },
    SourceName:{
    fontSize:12,
    fontWeight:'400',
    color:Colors.darkGrey,
    }
})