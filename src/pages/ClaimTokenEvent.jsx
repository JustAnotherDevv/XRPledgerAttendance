import { useState, useEffect, useContext } from "react";
import ModernButton from "../components/ModernButton.jsx";
import { Context } from "../Context";
import { truncateStr } from "../utils.js";
//import xrpl from "xrpl";
import { useParams, Link } from "react-router-dom";

function ClaimTokenEvent() {
  const [mintResponse, setMintResponse] = useState("Loading...");
  const [userNft, setUserNft] = useState();
  const [storedImage, setStoredImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { localWallet, setLocalWallet } = useContext(Context);
  let params = useParams();

  async function createAcc() {
    const response = await fetch(
      `/api/getMyNfts?walletAddress=radTiJ4YJXKpgFrMdN9RMVgdSaZR6bRHm8`
    );
    const nfts = await response.json();
    console.log(nfts.result.account_nfts);
  }

  async function getUserNfts() {
    console.log("getUserNfts");
    const response = await fetch(
      `/api/getMyNfts?walletAddress=${localWallet.classicAddress}`
    );
    const nfts = await response.json();
    console.log(nfts.result.account_nfts);
  }
  async function claimNft() {
    setMintResponse("Loading");
    const response = await fetch(
      `/api/claim?seed=${localWallet.seed}&id=${params.claimId}`
    );
    const responseToJson = await response.json();
    if (responseToJson.status != "404") {
      console.log(responseToJson);
      responseToJson.URI =
        "https://xrpl-proof-of-attendance.infura-ipfs.io/ipfs/" +
        responseToJson.result.URI.substring(7);
      setUserNft(responseToJson.result);
    }
    setMintResponse(responseToJson.status);
  }

  async function checkClaims() {
    setIsLoading(true);
    setMintResponse("Loading...");
    setUserNft(null);
    console.log("checking claim");
    const response = await fetch(
      `/api/checkClaims?seed=${localWallet.seed}&id=${params.claimId}`
    );
    let responseToJson = await response.json();
    if (responseToJson.status != "404") {
      console.log(responseToJson.result);
      responseToJson.URI =
        "https://xrpl-proof-of-attendance.infura-ipfs.io/ipfs/" +
        responseToJson.result.URI.substring(7);
      console.log(await (await fetch(responseToJson.URI)).json());
      setStoredImage(
        (await "https://xrpl-proof-of-attendance.infura-ipfs.io/ipfs/") +
          (await (
            await (await fetch(responseToJson.URI)).json()
          ).URI.substring(7))
      );
    }
    await setUserNft(responseToJson.result);
    setMintResponse(responseToJson.status);
    setIsLoading(false);
  }

  async function checkAllClaims() {
    setMintResponse(
      "Checking if requested event exists and whether or not user is eligible to claim."
    );
    const response = await fetch(
      `/api/checkAllClaims?seed=${localWallet.seed}&id=${params.claimId}`
    );
    const responseToJson = await response.json();
    console.log(responseToJson);
    setMintResponse(JSON.stringify(responseToJson.result));
  }

  function hex2a(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  useEffect(() => {
    (async () => {
      console.log("trying to claim");
      if (localWallet.classicAddress != "") checkClaims();
    })();
  }, []);

  function LoadingDataCard() {
    return (
      <div className="center w-full h-96">
        <div className="flex justify-center align-middle content-center self-center items-center center text-center mt-96">
          {mintResponse}
        </div>
      </div>
    );
  }

  function ClaimNotFoundCard() {
    return (
      <div className="App flex flex-col items-center p-5 mt-72 ">
        <p className="text-8xl font-bold text-primary">404</p>
        <p className="text-3xl font-semibold mt-10 mb-6">
          The requested claim event does not exist
        </p>
        <Link to="/claim">
          <button className="btn btn-primary rounded-lg shadow-md mx-4 mt-2">
            Go back
          </button>
        </Link>
      </div>
    );
  }
  //NFTokenID
  function ClaimingDataCard() {
    return (
      <div className="App flex flex-col items-center p-5">
        {mintResponse == "transferred" ? (
          <div className="flex flex-col justify-center align-middle content-center self-center items-center center text-center">
            <p className="text-6xl font-bold mt-24 text-primary">
              The NFT proving attendance of event was successfully claimed
            </p>
            <p className="text-3xl font-semibold my-16">
              You can close this page now
            </p>
            <img
              src={storedImage}
              alt="NFT image"
              className="w-72 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl rounded-lg origin-bottom hover:-rotate-1 hover:opacity-80"
            />
            <div className="flex mt-16">
              <Link to="/claim">
                <button className="btn btn-primary rounded-lg shadow-md">
                  Explore more events
                </button>
              </Link>
              <button
                className="btn btn-gray rounded-lg shadow-md ml-5"
                href="https://devnet.xrpl.org/nft/00080000A452569E97144F35A6CD64B2763D0512C0D8E3EF0000099B00000000"
                target="_blank"
                onClick={() =>
                  window.open(
                    "https://devnet.xrpl.org/nft/00080000A452569E97144F35A6CD64B2763D0512C0D8E3EF0000099B00000000",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                View token on xrpl.org
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-6xl font-bold mt-24 text-primary">
              {params.claimId}
            </p>
            <p className="text-3xl font-semibold my-16">
              Claim your NFT by clicking on button below
            </p>
            <img
              src={storedImage}
              alt="NFT image"
              className="w-72 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl rounded-lg origin-bottom hover:-rotate-1 hover:opacity-80"
            />

            <div className="flex mt-16">
              <p className="text-3xl font-bold mt-1">
                {userNft.remaining} / {userNft.claimable}
              </p>{" "}
              <p className="text-2xl ml-2 mt-1">NFTs remaining</p>
              <button
                className="btn btn-primary rounded-lg shadow-md ml-6"
                onClick={() => claimNft()}
                disabled={mintResponse == "claimed"}
              >
                Claim
              </button>
            </div>
            {mintResponse == "claimed" ? (
              <>
                <div className="toast toast-bottom toast-center w-1/2">
                  <div className="alert alert-error">
                    <div>
                      <span className="text-gray-700">
                        It looks like you already claimed this NFT. Come back in
                        the future during other events.
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {mintResponse == "empty" ? (
              <>
                <div className="toast toast-bottom toast-center w-1/2">
                  <div className="alert alert-error">
                    <div>
                      <span className="text-gray-700">
                        All NFTs for this event were already claimed. Come back
                        in the future during other events.
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    );
  }

  if (isLoading && !userNft) {
    return <LoadingDataCard />;
  } else if (mintResponse == "404") {
    return <ClaimNotFoundCard />;
  } else {
    return <ClaimingDataCard />;
  }
}

export default ClaimTokenEvent;
