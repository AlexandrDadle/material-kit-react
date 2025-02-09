import { useState, useEffect, useMemo, useCallback } from 'react';
import { getUser, removeUser, setUser, getRole } from 'src/utils/services/userService';
import { getToken, removeToken, setToken } from 'src/utils/helpers/jwtHelper';

const useAuth = () => {
  console.log('useAuth hook called'); // Debug log
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken() && !!getUser());
  const [user, setUserState] = useState<any>(getUser()); // Initialize with the user object

  useEffect(() => {
    const token = getToken();
    const currentUser = getUser();
    console.log('useAuth - user:', currentUser); // Debug log

    if (token && currentUser) {
      console.log('User is authenticated');
      console.log('User role:', currentUser?.role || ''); // Debug log
      setIsAuthenticated(true);
      setUserState(currentUser);
    } else {
      console.log('User is not authenticated');
      setIsAuthenticated(false);
      setUserState(null);
      removeToken();
    }
  }, []);

  const login = useCallback((token: string, userObj: any) => {
    setToken(token);
    setUser(userObj);
    setIsAuthenticated(true);
    console.log('User logged in with role:', userObj?.role || ''); // Debug log
    setUserState(userObj); // Ensure user state is set on login
  }, []);

  const logout = useCallback(() => {
    console.log('Logging out');
    setIsAuthenticated(false);
    removeToken();
    removeUser();
    setUserState(null);
  }, []);

  const authValues = useMemo(() => ({ isAuthenticated, user, login, logout, getRole }), [isAuthenticated, user, login, logout]);

  console.log('useAuth - authValues:', authValues); // Debug log

  return authValues;
};

export default useAuth;
