import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkUser, registerUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();
const UserContext = createContext(); // Create the UserContext

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => { // Make this function async
      if (fbUser) {
        setOAuthUser(fbUser);
        let userObj = { fbUser, uid: fbUser.uid };
        setUser(userObj);
        try {
          const gamerInfo = await checkUser(fbUser.uid); // Await the checkUser function
          if (gamerInfo && typeof gamerInfo === 'object' && !('null' in gamerInfo)) {
            userObj = { ...userObj, ...gamerInfo };
            setUser(userObj);
          } else {
            const registeredUser = await registerUser({ uid: fbUser.uid }); // Await the registerUser function
            userObj = { ...userObj, ...registeredUser };
            setUser(userObj);
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null || oAuthUser === null,
    }),
    [user, oAuthUser],
  );

  const userValue = useMemo(() => ({ user }), [user]); // Create a value for the UserContext

  return (
    <AuthContext.Provider value={value}>
      <UserContext.Provider value={userValue} {...props} /> {/* Provide the UserContext */}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {
  AuthProvider, useAuth, AuthConsumer, UserContext,
}; // Export the UserContext
