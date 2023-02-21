import googleLogo from "@/public/assets/googleLogo.png";
import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import Image from "next/image";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "@/utils/web3RPC.ts";
import { useRecoilState } from "recoil";
import { web3AuthState } from "@/recoil/atoms";
import Link from "next/link";

const clientId =
  "BOBp7QQm8zcJlzX9L3WVh7J3Tvk4Hzx816FL4dLzqnhSpBs-R4X5Za6jfiPeg15cLpLZK2CYJWCOBRXlcTO1WyE";

function Header(props) {
  const [showModal, setShowModal] = useState(false);
  const [web3auth, setWeb3auth] = useRecoilState(web3AuthState);
  const [provider, setProvider] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3_auth = new Web3Auth({
          clientId:
            "BOBp7QQm8zcJlzX9L3WVh7J3Tvk4Hzx816FL4dLzqnhSpBs-R4X5Za6jfiPeg15cLpLZK2CYJWCOBRXlcTO1WyE",
          web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget:
              "https://goerli.infura.io/v3/e622d5b0025f45c3ab950f34b5524305",
            displayName: "Goerli Testnet",
            blockExplorer: "https://goerli.etherscan.io",
            ticker: "ETH",
            tickerName: "Ethereum",
          },
        });
        console.log("web3_auth", web3_auth);

        setWeb3auth(() => {
          return web3_auth;
        });
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const init_web3auth = async () => {
      if (
        Object.keys(web3auth).length !== 0 &&
        web3auth.constructor !== Object
      ) {
        if (provider) return;
        await web3auth.initModal();
        setProvider(web3auth.provider);
      }
    };
    init_web3auth();
  }, [web3auth]);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const loggedInView = (
    <div className={style.loginview}>
      <Link href={"/mypage"}>
        <div>My Page</div>
      </Link>
      <button onClick={logout} className={style.loginbutton}>
        로그아웃
      </button>
      {/* <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div> */}

      {/* <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Logged in Successfully!</p>
      </div> */}
    </div>
  );

  const unloggedInView = (
    <button onClick={login} className={style.loginbutton}>
      로그인
    </button>
  );

  return (
    <>
      <div className={style.header}>
        <Link href="/">
          <div className={style.homebutton}>DCR</div>
        </Link>
        {provider ? loggedInView : unloggedInView}
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className={style.loginmodal}
        ></div>

        // <div onClick={() => setShowModal(false)} className={style.loginmodal}>
        //   <div
        //     onClick={(e) => e.stopPropagation()}
        //     className={style.loginmodalcontainer}
        //   >
        //     <svg
        //       className={style.closebutton}
        //       xmlns="https://www.w3.org/2000/svg"
        //       viewBox="0 0 24 24"
        //       fill="#eee"
        //       onClick={() => setShowModal(false)}
        //     >
        //       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        //       <path fill="none" d="M0 0h24v24H0z"></path>
        //     </svg>

        //     <div className={style.googlelogin}>
        //       <h1>Decentralized Copyright</h1>
        //       <h3>로그인하기</h3>
        //       <div>
        //         <button
        //           onClick={() => {
        //             // setIsGoogleClicked(true);
        //           }}
        //           className={style.googleloginbutton}
        //         >
        //           <Image alt="google" src={googleLogo}></Image>
        //           <span>Login with Google</span>
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
}

export default Header;
