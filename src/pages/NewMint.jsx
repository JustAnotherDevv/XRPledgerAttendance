import { useState, useEffect, useContext } from "react";
import ModernButton from "../components/ModernButton.jsx";
import { Context } from "../Context";
import { truncateStr } from "../utils.js";
//import xrpl from "xrpl";

function NewMint() {
  const [eventDate, setEventDate] = useState();
  const [nftsAmount, setNftsAmount] = useState("3");
  const [collectionName, setCollectionName] = useState("");
  const [collectionDesc, setCollectionDesc] = useState("");
  const [collectionLocation, setCollectionLocation] = useState("");
  const [collectionUri, setCollectionUri] = useState(
    "ipfs://QmPr4AnYnFnNkmLaAgtqcRvfJ8Q1dkGEebJdibTRGQhc5Z"
  );
  const [mintResponse, setMintResponse] = useState(
    "Waiting for user to fill out the data"
  );
  const [image, setimage] = useState();

  const { localWallet, setLocalWallet } = useContext(Context);

  async function mintNfts() {
    setMintResponse("Mint request sent.");
    const response = await fetch(
      `/api/mint?walletAddress=${localWallet.classicAddress}&tokenCount=${nftsAmount}&url=${collectionUri}&title=${collectionName}&desc=${collectionDesc}&loc=${collectionLocation}`
    );
    const responseToJson = await response.json();
    //console.log(responseToJson.result);
    setMintResponse(responseToJson.result);
  }

  async function getUserNfts() {
    console.log("getUserNfts");
    var data = new FormData();
    data.append("file", image);
    const response = await fetch(
      `/api/getMyNfts?walletAddress=${localWallet.classicAddress}`
      /*{
        method: "POST",
        body: image,
      }*/
    );
    const nfts = await response.json();
    console.log(nfts.result.account_nfts);
  }

  async function handleImageSending(event) {
    //await new Promise((r) => setTimeout(r, 2000));
    const file = await event.target.files[0];
    console.log(file);
    setimage(file);
  }

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <div className="App flex flex-col items-center p-5">
      {!image ? "" : <div>{image.size}</div>}
      <p className="text-6xl font-bold mt-12 mb-6 text-primary">
        Mint NFTs for your event
      </p>
      <div className="container flex p-10 center w-full">
        <div className="w-1/2 p-4 mr-5 flex flex-col gap-8 items-end">
          <input
            type="text"
            placeholder="Collection name"
            className="input input-bordered w-full max-w-xs"
            value={collectionName}
            onChange={(event) => setCollectionName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Collection description"
            className="input input-bordered w-full max-w-xs"
            value={collectionDesc}
            onChange={(event) => setCollectionDesc(event.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full max-w-xs"
            value={collectionLocation}
            onChange={(event) => setCollectionLocation(event.target.value)}
          />
        </div>
        <div className="w-1/2 p-4 ml-5 flex flex-col gap-8  items-start">
          <input
            type="text"
            placeholder="Uri"
            className="input input-bordered w-full max-w-xs"
            value={collectionUri}
            onChange={(event) => setCollectionUri(event.target.value)}
          />
          <input
            type="number"
            placeholder="Amount of NFTs to mint"
            className="input input-bordered w-full max-w-xs"
            value={nftsAmount}
            onChange={(event) => setNftsAmount(event.target.value)}
            min="0"
          />
          <input
            type="file"
            name="nftimage"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleImageSending}
            accept=".jpg, .jpeg, .png"
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary rounded-lg shadow-md"
          onClick={() => mintNfts()}
        >
          Mint
        </button>
      </div>
      <div className="card w-2/3 shadow-xl bg-base-200 mt-10">
        <div className="card-body flex flex-col justify-center">
          <h2 className="card-title text-center block mb-5">Server logs</h2>
          <textarea
            className="textarea card w-full h-48"
            placeholder="Bio"
            disabled
            value={mintResponse}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default NewMint;
