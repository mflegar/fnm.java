import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";

type UserContextType = {
  token: string | null;
  isLoggedIn: () => boolean;
  logout: () => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setIsReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const isLoggedIn = () => {
    return token !== null;
  };

  return (
    <UserContext.Provider value={{ token, isLoggedIn, logout }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
