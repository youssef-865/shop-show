import { createContext, useEffect, useState } from "react";

// إنشاء الـ context
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("userToken")!==null)
    {
        setLogin(localStorage.getItem("userToken"))
    }
  
  }, [])
  

  return (
    <UserContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}
