
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Product from './components/Product';
function App() {
  return (
   <BrowserRouter>
   <div>
      <header>
        <a href='/' className='logo'>eSHOP</a>
      </header>
      <main>
        <Routes>
          <Route path='/product/:slug' element={<ProductScreen/>}></Route>
          <Route path='/' element={<HomeScreen/>}></Route>
          <Route path='/' element={<Product/>}></Route>
        </Routes>
      </main>
   </div>
   </BrowserRouter>
  );
}

export default App;
