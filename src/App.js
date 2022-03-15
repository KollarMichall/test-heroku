import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import CollectionOverview from "./components/CollectionOverview";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./constants/baseUrl";
import { useDispatch } from "react-redux";
import { getSections } from "./redux/category/categoryActions";
import WithSpinner from "./components/spinner/WithSpinner";
import { getCollectionsStartAsync } from "./redux/shop/shopActions";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import Contact from "./pages/Contact";

const HomePageWithSpinner = WithSpinner(HomePage)

function App() {
  const [loading, setLoading] = useState(true) //fix later
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${baseUrl}section`).then(res => {
        dispatch(getSections(res.data))
        setLoading(false)
      })

    }, 1000);
    // getcollections
    dispatch(getCollectionsStartAsync())

  }, [dispatch])


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePageWithSpinner isLoading={loading} />} />
        <Route path="/shop" element={<CollectionOverview/>} />
        <Route path="/shop/:id" element={<CategoryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}


export default App;
