import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { checkUser, registerUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();
const UserContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        let userObj = { fbUser, uid: fbUser.uid };
        setUser(userObj);
        try {
          const gamerInfo = await checkUser(fbUser.uid);
          if (gamerInfo && typeof gamerInfo === 'object' && !('null' in gamerInfo)) {
            userObj = { ...userObj, ...gamerInfo };
            setUser(userObj);
          } else {
            const registeredUser = await registerUser({ uid: fbUser.uid });
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

  const userValue = useMemo(() => ({
    user,
    performerId: user?.performerId,
    promotionId: user?.promotionId,
    id: user?.id,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      <UserContext.Provider value={userValue}> {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
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
};
