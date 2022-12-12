import { useState, useContext, useEffect } from "react";
import { useAccountData } from "../../hooks/useAccountData";
import { truncateStr } from "../../utils.js";
import { Context } from "../../Context";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import NewMint from "../../pages/NewMint";
import ClaimToken from "../../pages/ClaimToken";
import ClaimTokenEvent from "../../pages/ClaimTokenEvent";

function Navbar() {
  const { localWallet, setLocalWallet } = useContext(Context);

  async function login() {
    const response = await fetch(`/api/getNewAccount`);
    const acc = await response.json();
    console.log(JSON.stringify(acc.result));
    setLocalWallet(acc.result);
  }

  async function logout() {
    setLocalWallet({
      publicKey: "",
      privateKey: "",
      classicAddress: "",
      seed: "",
    });
  }

  useEffect(() => {}, []);

  return (
    <>
      <div className="navbar bg-primary-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            <span className="font-extrabold text-2xl">XRPL PoA </span>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/claim">Claim</Link>
            </li>
            <li>
              <Link to="/mint">Create</Link>
            </li>
            <li>
              {localWallet.classicAddress == "" ? (
                <button
                  className="btn btn-primary rounded-lg shadow-md"
                  onClick={() => login()}
                >
                  Login
                </button>
              ) : (
                <button
                  className="btn btn-primary rounded-lg shadow-md px-5"
                  onClick={() => logout()}
                >
                  {truncateStr(localWallet.classicAddress, 4)}
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="mint" element={<NewMint />} />
        <Route path="claim" element={<ClaimToken />} />
        <Route path="claim/:claimId" element={<ClaimTokenEvent />} />
      </Routes>
    </>
  );
}

export default Navbar;
