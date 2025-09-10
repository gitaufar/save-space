import React from 'react'
import { Text, View } from 'react-native'

type SpaceHeaderProps = {
    title: string
    desc: string
    classname?: string
    logo: React.ReactNode
}

export default function Header({title, desc, classname,logo}: SpaceHeaderProps) {
  return (
    <View className={`flex flex-col w-full items-center ${classname} gap-2`}>
        <View className='flex p-3 bg-primary rounded-xl w-fit'>
            {logo
                ? React.isValidElement(logo)
                    ? logo
                    : null
                : null}
        </View>
        <Text className='text-2xl text-center font-bold text-black_common'>{title}</Text>
        <Text className='text-light_grey'>{desc}</Text>
    </View>
  )
}