import './App.css';
import Products from './Components/products';
import PPage from './Components/products_page';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/header';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/ppage/:id" element={<PPage />} />
      </Routes>
    </>

  );
}

export default App;
