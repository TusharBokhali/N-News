import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
type Props ={
    onCategoryChanged: (category: string)=> void;
}
export default function Categories({onCategoryChanged}:Props) {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex,setActiveIndex] = useState(0);

    const handleSelectCate = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);
    
        selected?.measure((x, y, width, height, pageX, pageY) => {
            scrollRef.current?.scrollTo({ x: pageX -20 , y: 0, animated: true });
        });

        onCategoryChanged(newsCategoryList[index].slug)
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Trending Right Now</Text>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemwareper}>
        {
            newsCategoryList.map((el,ind)=>(
                <TouchableOpacity 
                ref={(el)=>itemRef.current[ind] = el}
                key={ind}
                style={[styles.opa, activeIndex === ind && styles.Active]} 
                onPress={()=>handleSelectCate(ind)}>
                    <Text style={[styles.Item, activeIndex === ind && styles.ActiveText]}>{el.title}</Text>
                </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{

    },
    Title:{
        fontSize:18,
        fontWeight:'600',
        color:Colors.black,
        marginBottom:10,
        marginLeft:20,
    },
    itemwareper:{
        gap:20,
        paddingVertical:10,
        paddingHorizontal:20,
        marginBottom:10,
    },
    opa:{
        borderWidth:1,
        borderColor:Colors.darkGrey,
        paddingVertical:10,
        paddingHorizontal:16,
        borderRadius:10,
    },
    Active:{
        backgroundColor:Colors.tint,
        borderColor:Colors.tint,
    },
    ActiveText:{
        fontWeight:'600',
        color:Colors.white,
    },
    Item:{
        fontSize:14,color:Colors.darkGrey,letterSpacing:0.5
    }
})