import { createContext, useContext } from "react";
import { baseChar } from "../../constants/baseChar.ts";
import { Character } from "../../types/Character.ts";

export const charContext = createContext<Character>(baseChar);

export const useChar = () => useContext(charContext);
