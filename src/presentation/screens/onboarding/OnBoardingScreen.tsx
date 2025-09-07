import React from 'react'
import { View } from 'react-native'
import {OnBoardingLayout} from '../../components/onboarding/OnBoardingLayout'

export default function OnBoardingScreen() {
  return (
    <View className='flex-1 flex flex-col'> 
        <OnBoardingLayout title='Selamat Datang'/>
    </View>
  )
}