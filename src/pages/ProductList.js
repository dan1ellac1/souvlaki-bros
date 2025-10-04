import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FullMenu } from '../Menu/FullMenu'
import { Write } from '../components/Write'
import {React, useState} from 'react'

export const ProductList = ({ adminCheck, guest, setGuest, user}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSavedData = () => {
    setRefreshTrigger(prev => !prev); // toggle to trigger FullMenu useEffect
  };

  return (
    <>
      <Header setGuest={setGuest} guest={guest} user={user}/>
      <main>
        {adminCheck && <Write savedData={handleSavedData} />}
        <FullMenu savedData={refreshTrigger} guest={guest}/>
      </main>
      <Footer />
    </>
  );
};

