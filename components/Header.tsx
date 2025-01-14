import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image 
        source={{uri:'https://xsgames.co/randomusers/avatar.php?g=male'}} 
        style={styles.userImg}/>
        <View style={{gap:3}}>
            <Text style={styles.welcomeTxt}>Welcome</Text>
            <Text style={styles.userName}>John !</Text>
        </View>
      </View>
    <TouchableOpacity>
        <Ionicons name='notifications-outline' size={24} color={Colors.black}/>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
    },
    userImg:{
        width:50,
        height:50,
        borderRadius:30,
    },
    userInfo:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    userName:{
        fontSize:14,
        fontWeight:'700',
        color:Colors.black,
    },
    welcomeTxt:{
        fontSize:12,
        color:Colors.darkGrey,
    }
})