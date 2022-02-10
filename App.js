import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <FontAwesome name="th-list" size={20} />
};


const trackCreateStack = createStackNavigator({ 
  TrackCreate: TrackCreateScreen
});

const accountStack = createStackNavigator({ 
  Account: AccountScreen
});


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: { 
      screen: trackCreateStack, 
      navigationOptions: {
        title: "Add Track",
        tabBarIcon: <FontAwesome name="plus" size={20} />
      }
    },
    Account: {
      screen: accountStack, 
      navigationOptions: {
        title: "Account",
        tabBarIcon: <FontAwesome name="gear" size={20} />
      }
    },
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
