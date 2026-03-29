import { createContext, useContext } from "react";

export const AuthContext = createContext({
  jwtToken: null,
  setJwtToken: () => null,
});

export function useAuth() {
  return useContext(AuthContext);
}
