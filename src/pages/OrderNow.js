import React from 'react'
import { Header } from '../components/Header'

export const OrderNow = ({setGuest, guest, user, phoneVerified}) => {
  return (
    <>
     <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified}/>
    </>
  )
}
