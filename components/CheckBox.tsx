import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
    label:string;
    checked:boolean;
    onPress: () => void;
}

export default function CheckBox({label, checked , onPress}: Props) {
    const rnAnimationConten = useAnimatedStyle(()=>{
        return {
            backgroundColor:withTiming( checked ? "rgba(239,142,82,0.1)" : 'transparent', {duration:150}),
            borderColor: withTiming(checked ? Colors.tint : Colors.black,{duration:150}),
            paddingLeft:16,            
            paddingRight:checked ? 10 :16,
        };
    },[checked])

    const rnStyle = useAnimatedStyle(()=>{
        return {
            color:withTiming( checked ? Colors.tint : Colors.black, {duration:150}),
        
        }
    },[checked])
  return (
    <Animated.View style={[styles.container,rnAnimationConten]} onTouchEnd={onPress} layout={LinearTransition.springify().mass(0.8)}> 
      <Animated.Text style={[styles.labels,rnStyle]}>{label}</Animated.Text>
      {
        checked && (
      <Animated.View style={{marginLeft:8,height:14,width:14,}} entering={FadeIn.duration(350)} exiting={FadeOut}>
        <AntDesign name='checkcircle' size={14} color={Colors.tint}/>
      </Animated.View>
        )
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:Colors.black,
        paddingVertical:8,
        borderRadius:32,
    },
    labels:{
        fontSize:14,
        color:Colors.black,
    }

})