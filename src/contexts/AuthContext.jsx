import React, { createContext } from "react";

const defaultValue = {
  username: "Admin",
  address: "",
};

export const AuthContext = createContext(defaultValue);

const Auth = ({ children }) => {
  const [auth, setAuth] = React.useState(defaultValue);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
