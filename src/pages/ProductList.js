import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FullMenu } from '../Menu/FullMenu'
import { Write } from '../components/Write'
import {React, useState} from 'react'

export const ProductList = ({ adminCheck, guest, setGuest}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSavedData = () => {
    setRefreshTrigger(prev => !prev); // toggle to trigger FullMenu useEffect
  };

  return (
    <>
      <Header setGuest={setGuest} guest={guest}/>
      <main>
        {adminCheck && <Write savedData={handleSavedData} />}
        <FullMenu savedData={refreshTrigger} guest={guest}/>
      </main>
      <Footer />
    </>
  );
};

