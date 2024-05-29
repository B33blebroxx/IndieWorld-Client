// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext, //
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkUser, registerUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        let userObj = { fbUser, uid: fbUser.uid };
        setUser(userObj);
        checkUser(fbUser.uid).then((gamerInfo) => {
          if (gamerInfo && typeof gamerInfo === 'object' && !('null' in gamerInfo)) {
            userObj = { ...userObj, ...gamerInfo };
            setUser(userObj);
          } else {
            // If checkUser returns NotFound, register the user
            registerUser({ uid: fbUser.uid }).then((registeredUser) => {
              userObj = { ...userObj, ...registeredUser };
              setUser(userObj);
            });
          }
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo(
    // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null || oAuthUser === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [user, oAuthUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
