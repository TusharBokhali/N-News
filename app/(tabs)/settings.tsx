import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  const [isEnabled,setEnabled] = useState(false)
  const toggleSwitch = () => setEnabled((previousState) => !previousState)
  return (
    <>
    <Stack.Screen options={{
      headerShown:true
    }}/>
      <View style={styles.container}>
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.About}>About</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.About}>Send Feedback</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.About}>Privacy Policy</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.About}>Terms Of Use</Text>
            <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn} onPress={toggleSwitch}>
          <Text style={styles.About}>Dark Mode</Text>
            <Switch 
            trackColor={{false:'#767577',true:'#3e3e3e'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor={'#3e3e3e'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{marginBottom:-15,marginRight:-8,}}
            />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}>
          <Text style={[styles.About,{color:'red'}]}>Logout</Text>
            <MaterialIcons name='logout' size={16} color={'red'}/>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Btn:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.white,
    paddingHorizontal:16,
    paddingVertical:20,
    borderBottomColor:Colors.background,
    borderBottomWidth:1,
  },
  About:{
    fontSize:14,
    fontWeight:'600',
    color:Colors.black,
  }
})