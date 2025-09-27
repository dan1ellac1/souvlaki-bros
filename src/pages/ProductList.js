import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FullMenu } from '../Menu/FullMenu'
import { Write } from '../components/Write'
import {React, useState} from 'react'

export const ProductList = ({ adminCheck }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSavedData = () => {
    setRefreshTrigger(prev => !prev); // toggle to trigger FullMenu useEffect
  };

  return (
    <>
      <Header />
      <main>
        {adminCheck && <Write savedData={handleSavedData} />}
        <FullMenu savedData={refreshTrigger} />
      </main>
      <Footer />
    </>
  );
};

