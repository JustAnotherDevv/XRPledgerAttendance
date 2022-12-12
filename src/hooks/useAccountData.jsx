import { useState, useEffect } from "react";

export function useAccountData() {
  const [localWallet, setLocalWallet] = useState({
    publicKey: "",
    privateKey: "",
    classicAddress: "",
    seed: "",
  });

  async function changeWallet() {
    const response = await fetch(`/api/getNewAccount`);
    const acc = await response.json();
    console.log(JSON.stringify(acc.result));
    setLocalWallet(acc.result);
  }

  useEffect(() => {
    /*(async () => {
      await changeWallet({
        publicKey:
          "ED0BFA7BDD2C5C6CCC5DE4B3338C72EACC47D7B989CC82AA6E206D9032D41734C2",
        privateKey:
          "ED1C3A30EC4F0D5EAA19D4065BF3514FEE3B9C8084EBDE296B2437F4D6552B9A82",
        classicAddress: "rExCMFSUAPpw1fyaCWZ7ADEgGgnsDDqjf5",
        seed: "sEd7j9qEvFfHggMntAuEY7kj99CAvBo",
      });
    })();*/
  }, []);

  return [localWallet, changeWallet];
}
