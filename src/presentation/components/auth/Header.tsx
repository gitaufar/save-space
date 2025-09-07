import React from 'react'
import { Text, View } from 'react-native'
import Logo from '../../../assets/icon/icon_putih.svg'

type HeaderProps = {
    title: string
    desc: string
    classname?: string
}

export default function Header({title, desc, classname}: HeaderProps) {
  return (
    <View className={`flex flex-col w-full items-center ${classname} gap-2`}>
        <View className='flex p-3 bg-primary rounded-xl w-fit'>
            <Logo width={40} height={46} />
        </View>
        <Text className='text-2xl text-center font-bold text-black_common'>{title}</Text>
        <Text className='text-light_grey'>{desc}</Text>
    </View>
  )
}
