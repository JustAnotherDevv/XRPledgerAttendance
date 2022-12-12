import { useState, useEffect, useContext } from "react";
import ModernButton from "../components/ModernButton.jsx";
import { Context } from "../Context";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";

function ClaimToken() {
  const [collectionName, setCollectionName] = useState("");
  const { localWallet, setLocalWallet } = useContext(Context);

  return (
    <div className="App flex flex-col items-center p-5">
      <h1 className="flex text-4xl mt-48 font-semibold text-primary">
        Hello <span className="animate-waving-hand">👋🏻</span>, Choose yor event
        to claim NFT
      </h1>
      <p className="text-2xl my-10">
        Open the link you received directly in the browser or paste the event id
        here.
      </p>
      <div className="container mt-24 center w-full">
        <input
          type="text"
          placeholder="Collection claim ID"
          className="input input-bordered w-full max-w-sm mx-4"
          value={collectionName}
          onChange={(event) => setCollectionName(event.target.value)}
        />

        <Link to={collectionName}>
          <button
            className="btn btn-primary rounded-lg shadow-md mx-4 mt-2"
            //onClick={() => claimNft()}
          >
            Claim
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ClaimToken;
