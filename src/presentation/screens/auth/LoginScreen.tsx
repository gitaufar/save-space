import React from 'react'
import { View } from 'react-native'
import Header from '../../components/auth/Header'

export default function LoginScreen() {
  return (
    <View className='flex-1 flex flex-col'> 
        <Header title='Selamat Datang' desc='Masuk ke akun anda'/>
    </View>
  )
}
