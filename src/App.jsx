import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ModernButton from "./components/ModernButton.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import NewMint from "./pages/NewMint";
import ClaimToken from "./pages/ClaimToken";
import ClaimTokenEvent from "./pages/ClaimTokenEvent";
import { truncateStr } from "./utils.js";

function App() {
  const [xrpWallet, setXrpWallet] = useState({
    publicKey: "",
    privateKey: "",
    classicAddress: "",
    seed: "",
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="mint" element={<NewMint />} />
        <Route path="claim" element={<ClaimToken />} />
        <Route path="claim/:claimId" element={<ClaimTokenEvent />} />
      </Route>
    )
  );

  async function login() {
    const response = await fetch(`/api/getNewAccount`);
    const acc = await response.json();
    console.log(JSON.stringify(acc.result));
    setXrpWallet(acc.result);
  }

  async function logout() {
    setLocalWallet({
      publicKey: "",
      privateKey: "",
      classicAddress: "",
      seed: "",
    });
  }

  useEffect(() => {
    //login();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
