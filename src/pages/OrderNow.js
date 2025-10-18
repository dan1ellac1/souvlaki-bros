import React from 'react'
import { Header } from '../components/Header'

export const OrderNow = ({setGuest, guest, user, phoneVerified, phoneNumber}) => {
  return (
    <>
     <Header setGuest={setGuest} guest={guest} user={user} phoneVerified={phoneVerified}/>
    </>
  )
}
