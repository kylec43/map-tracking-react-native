import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <>
      <Button
        title="Sign Out"
        onPress={signout}
      />
    </>
  );
};

AccountScreen.navigationOptions = { 
  title: "Account Settings" 
};

const styles = StyleSheet.create({});

export default AccountScreen;
