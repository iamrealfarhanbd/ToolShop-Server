
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Routes, Route, } from "react-router-dom";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import RequireAuth from './components/RequireAuth/RequireAuth';
import ProductDeatils from './components/ProductDeatils/ProductDeatils';
import NotFound from './components/NotFound/NotFound';
import Blog from './components/Blog/Blog';
import Footer from './components/Footer/Footer';
import RestPass from './components/Login/RestPass/RestPass';
import About from './components/About/About';
import AddProduct from './components/AddProduct/AddProduct';
import Allproduct from './components/Allproduct/Allproduct';
import { ToastContainer } from 'react-toastify';
import MyProduct from './components/MyProduct/MyProduct';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RestPass" element={<RestPass />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/About" element={<About />} />
        <Route path="/Registration" element={<Registration />} />
   
        <Route path="/Allproduct/:productId" element={<ProductDeatils />} />
 

        <Route path="/addproduct" element={
          <RequireAuth>
            <AddProduct />
          </RequireAuth>
        } />
        <Route path="/update/:id" element={
          <RequireAuth>
            <UpdateProduct />
          </RequireAuth>
        } />
        <Route path="/allproduct" element={
          <RequireAuth>
            <Allproduct />
          </RequireAuth>
        } />
        <Route path="/myproduct" element={
          <RequireAuth>
            <MyProduct />
          </RequireAuth>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
