import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {
    withHorizontalPadding:boolean;
    setSearchQuery:Function
}

export default function SearchBar({withHorizontalPadding,setSearchQuery}: Props) {
  return (
    <View style={[styles.container, withHorizontalPadding && {paddingHorizontal:20}]}>
    <View style={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey}/>
        <TextInput placeholder='Search' placeholderTextColor={Colors.lightGrey} style={styles.SearchInput} autoCapitalize='none' onChangeText={query => setSearchQuery(query)}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // marginHorizontal:20,
        marginBottom:20,
    },
    searchBar:{
        backgroundColor:'#E4E4E5',
        paddingHorizontal:12,
        paddingVertical:5,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    SearchInput:{
        fontSize:14,
        flex:1,
        color:Colors.darkGrey,
    }
})