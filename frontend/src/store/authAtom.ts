// src/store/authAtom.ts
import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    loggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
  },
});
