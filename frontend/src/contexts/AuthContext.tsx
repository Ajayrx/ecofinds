import { createContext, useState } from "react";
import type { ReactNode } from "react"; // ✅ type-only import

// User type
type User = {
  email: string;
  username: string;
};

// Context type
type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

// Provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export for provider
export default AuthProvider;
export { AuthContext };
