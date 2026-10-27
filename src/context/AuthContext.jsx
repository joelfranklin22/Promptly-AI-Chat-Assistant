import { createContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [accessTokens, setAccessTokens] = useState(null);
  return (
    <AuthContext.Provider
      value={{ accessTokens, setAccessTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
