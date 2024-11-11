import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
import CheckBox from '@/components/CheckBox'
import { useNewsCategory } from '@/constants/hooks/useNewsCategories'
import { useNewsCountry } from '@/constants/hooks/useNewsCountry'
import { Link } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
  const {newsCata,toggleNewsCategory} = useNewsCategory();
  const {newsCountry, toggleNewsCountry} = useNewsCountry();
  const [search,setSearch] = useState("");
  const [Country,setCountry] = useState("");
  const [Category,setCategory] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearch}/>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.ListContainer}>
        {newsCata.map((el,ind)=>(
          <CheckBox key={el.id} label={el.title} checked={el.selected} onPress={()=>{
            toggleNewsCategory(el.id);
            setCategory(el.slug)
          }}/>
        ))}
      </View>

      <Text style={styles.title}>Country</Text>
      <View style={styles.ListContainer}>
        {newsCountry.map((el,ind)=>(
          <CheckBox key={ind} label={el.name} checked={el.selected} onPress={()=>{
            toggleNewsCountry(ind);
            setCountry(el.code)
          }}/>
        ))}
      </View>
      <Link href={{
        pathname: `/Search`,
        params:{query:search, Category,Country}
      }} asChild>
      <TouchableOpacity style={styles.SearchBtn}>
        <Text style={styles.SearchBtnText}>Search</Text>
      </TouchableOpacity>
      </Link>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    marginTop:5,
  },
  title:{
    fontSize:18,
    fontWeight:'600',
    color:Colors.black,
    marginBottom:10,
  },
  ListContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    gap:16,
    marginTop:12,
    marginBottom:20,
  },
  SearchBtn:{
    backgroundColor:Colors.tint,
    alignItems:'center',
    padding:14,
    borderRadius:10,
    marginVertical:10,
  },
  SearchBtnText:{
    color:Colors.white,
    fontSize:16,
    fontWeight:'600',
  }
})