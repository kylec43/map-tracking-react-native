//import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm
 from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: {recording}, addLocation } = useContext(LocationContext);

  //Updates the callback when a value changes.
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <>
      <Map />
      <TrackForm />
      {err ? <Text>Please enable location services</Text> : null}
    </>
  )
};

TrackCreateScreen.navigationOptions = { 
  title: "Create a Track" 
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
