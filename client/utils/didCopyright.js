import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { EthrDID, DelegateTypes } from "ethr-did";
import { ethers } from "ethers";
// import didJWT from "did-jwt";
import {
  createVerifiableCredentialJwt,
  verifyCredential,
  // JwtPresentationPayload,
  createVerifiablePresentationJwt,
  verifyPresentation,
} from "did-jwt-vc";

// import Dotenv from "dotenv";
// Dotenv.config();

// require("dotenv").config();

// const mainKey = EthrDID.createKeyPair();
const chainNameOrId = 0x5; // goerli
// const RPC_URL = process.env.RPC_URL;
const RPC_URL = "https://goerli.infura.io/v3/e622d5b0025f45c3ab950f34b5524305";
console.log(RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Create Resolver using did-resolver
const providerConfig = {
  networks: [
    {
      name: "0x5",
      rpcUrl: RPC_URL,
    },
  ],
};
const resolver = new Resolver(getResolver(providerConfig));

// Issuer DID
// const ISSUER_ADDRESS = process.env.ISSUER_ADDRESS;
const ISSUER_ADDRESS = "0x804e489f9B7e770a4A90741BC3Ab687d64255e39";
// const ISSUER_PK = process.env.PRIVATE_KEY;
const ISSUER_PK =
  "5aac0b0cd6ac068035afcf4a2f78d37af1af3276df58befd15fb15cc0243778e";
const ISSUER_Did = new EthrDID({
  identifier: ISSUER_ADDRESS,
  privateKey: ISSUER_PK,
  provider: provider,
  chainNameOrId,
  alg: "ES256K",
});

// Claim Verfiable Credential(VC)
const claimVC = async (
  holderKey,
  holderPrivateKey,
  contentsTitle,
  contentsTime
) => {
  // const naclKey = tweetnacl.box.keyPair()
  try {
    // Holder DID
    const subjectDid = new EthrDID({
      chainNameOrId,
      identifier: holderKey,
      privateKey: holderPrivateKey,
      alg: "ES256K",
    });
    console.log("서브젝트did", subjectDid);
    // const didDocument = (await resolver.resolve(subjectDid.did)).didDocument;
    // console.log(didDocument);
    const vcPayload = {
      sub: subjectDid.did,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        iss: {
          Authority: "DCR",
          Message: "Test Message",
          Address: ISSUER_ADDRESS,
        },

        credentialSubject: {
          user: {
            DateOfIssue: "2023-02-15",
          },
          contents: {
            contentsTime,
            contentsTitle,
          },
        },
      },
    };
    console.log("서브젝트디아디닷디아디", subjectDid.did);

    // Create VC
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, ISSUER_Did);
    console.log(vcJwt);

    // Verify VC
    // const verifiedVC = await verifyCredential(vcJwt, resolver);

    claimVP(vcJwt);
    return vcJwt;
  } catch (error) {
    console.log("Claim VP API ERROR", error);
  }
};

// Claim Verfiable Presentation(VP)
const claimVP = async (vcJwt) => {
  try {
    // Holder DID
    // const subjectDid = new EthrDID({
    //   chainNameOrId,
    //   identifier: holderKey,
    // });
    // Create VP
    const vpPayload = {
      vp: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiablePresentation"],
        verifiableCredential: [vcJwt],
        foo: "bar",
      },
    };

    const vpJwt = await createVerifiablePresentationJwt(vpPayload, ISSUER_Did);
    console.log(vpJwt);

    // Verify VP
    const verifiedVP = await verifyPresentation(vpJwt, resolver);
    console.log(verifiedVP);
    return verifiedVP;
  } catch (error) {
    console.log("Claim VP API ERROR", error);
  }
  // const { kp, txHash } = await ISSUER_Did.createSigningDelegate(
  //     DelegateTypes.veriKey,
  //     360
  // )
  // console.log(kp, txHash)
  // await ISSUER_Did.addDelegate(web3.eth.accounts[3], {
  //     expiresIn: 360,
  //     delegateType: "sigAuth",
  // })
  // const encryptionKey = {
  //     publicKey: Buffer.from(naclKey.publicKey).toString("hex"),
  //     privateKey: Buffer.from(naclKey.secretKey).toString("hex"),
  // }
  // const jwt = await ethrDid.signJWT({ hello: "world" })
  // try {
  //     const { payload, issuer } = await ethrDid.verifyJWT(jwt, didResolver)
  //     // `issuer` contains the DID of the signing identity
  //     console.log(issuer)
  // } catch (e) {
  //     console.error("unable to verify JWT: ", e)
  // }
};

// const test = async () => {
//     console.log("##### add delegate ######")
//     const addDelegate = await ethrDid
//         .createSigningDelegate
//         // DelegateTypes.veriKey,
//         // 100
//         ()
// }

// claimVC(ISSUER_ADDRESS, "hihi", 3);
// module.exports = { claimVC };

// claimVC(ISSUER_ADDRESS, ISSUER_PK, "터널", 300);
