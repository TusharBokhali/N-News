import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

type props={
    sliderItem: NewsDataType,
    index:number,
    scrollX:SharedValue<number>
}

const {width} = Dimensions.get('screen');

export default function SliderItem({slideItem,index, scrollX}:props) {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
           Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP

          ),
        },
      ],
    };
  });
  return (
    <Link href={`/${slideItem.article_id}`} asChild> 
    <TouchableOpacity>
    <Animated.View style={[styles.container, rnStyle]} key={slideItem.article_id}>
     <Image source={{uri:slideItem.image_url}} style={styles.images}/>
     <LinearGradient colors={["transparent",'rgba(0,0,0,0.8)']} style={styles.background}>
        <View style={styles.sourceInfo}>
              {
                slideItem.source_icon && (
                  <Image source={{uri:slideItem.source_icon}} style={styles.IconNews}/>
                )
              }
              <Text style={{color:Colors.white,fontSize:12,fontWeight:'600'}}>{slideItem.source_name}</Text>
        </View>
           <Text style={{fontSize:12,color:Colors.white,position:'absolute',top:120,paddingHorizontal:20,fontWeight:'600',}} numberOfLines={2}>{slideItem.title}</Text>
     </LinearGradient>
    </Animated.View>
    </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
    container:{
        position:'relative',
        width:width,
        justifyContent:'center',
        alignItems:'center',
    },
    images:{
        width:width - 60,
        height:180,
        borderRadius:20,
    },
    background:{
      position:'absolute',
      left:30,
      top:0,
      right:0,
      width:width - 60,
      height:180,
      borderRadius:20,
      padding:20,
    },
    IconNews:{
      width: 25,
      height:25,
      borderRadius:20,
    },
    sourceInfo:{
      flexDirection:'row',
      position:'absolute',
      top:85,
      paddingHorizontal:20,
      alignItems:'center',
      gap:10,
    }
})
