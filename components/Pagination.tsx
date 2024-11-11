import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

type Props = {
    items: NewsDataType[],
    paginationIndex: number,
    scrollX: SharedValue<number>
}

export default function Pagination({ items, paginationIndex, scrollX }: Props) {
    return (
        <View style={Styles.container}>
            {
                items.map((_, index) => {
                    return (
                        <Animated.View style={[Styles.dot, { backgroundColor: paginationIndex === index ? Colors.tint : Colors.darkGrey }]} key={index} />
                    )
                })
            }

        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        backgroundColor: '#333',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    }
})