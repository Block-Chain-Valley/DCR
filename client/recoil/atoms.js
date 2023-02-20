import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const web3AuthState = atom({
  key: "web3Auth",
  default: {},
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const movieDataState = atom({
  key: "movieData",
  default: [],
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});
export const vcState = atom({
  key: "vc",
  default: {},
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});
