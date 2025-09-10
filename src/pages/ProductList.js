import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FullMenu } from '../Menu/FullMenu'
import { CreateProduct } from '../handlers/CreateProduct'

export const ProductList = ({adminCheck}) => {


  return (
    <>
    <Header />
    <main>
    {adminCheck ? (
      <CreateProduct/>
    ) :
    ""}
    <FullMenu/>

    </main>
    <Footer />
    </>
  )
}
