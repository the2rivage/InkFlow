import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Header,Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true); // when page is loading (fetching data from apwrite) , there will show loading icon
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false)); // finally function always run
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400 ">
        <div className="w-full block">
          <Header/>
          <main>
            {/* <Outlet/> */}
          </main>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
