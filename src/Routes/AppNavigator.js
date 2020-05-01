import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Landing from "../components/Pages/Landing";
import Verification from "../components/Pages/Verification";
import BusTracker from "../components/Pages/Map";


const AppNavigator = createStackNavigator({
  Landing: { screen: Landing },
  Verification: { screen: Verification },
  BusTracker: { screen: BusTracker }
});

export default createAppContainer(AppNavigator);