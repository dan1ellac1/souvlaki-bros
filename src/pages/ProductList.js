import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FullMenu } from '../Menu/FullMenu'
import { Write } from '../components/Write'
import {React, useState} from 'react'
import '../App.css';

export const ProductList = ({ phoneVerified, adminCheck, guest, setGuest, user, phoneNumber}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSavedData = () => {
    setRefreshTrigger(prev => !prev); // toggle to trigger FullMenu useEffect
  };

  return (
    <>
      <Header phoneNumber={phoneNumber}  phoneVerified={phoneVerified} setGuest={setGuest} guest={guest} user={user}/>
      <main>
        {adminCheck && <Write savedData={handleSavedData} />}
        <FullMenu savedData={refreshTrigger} user={user} guest={guest}/>
      </main>
      <Footer />
    </>
  );
};

