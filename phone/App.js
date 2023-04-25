import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Home from './pages/Home';
import Calculate from './pages/Calculate';
import Contact from './pages/Contact';
import Info from './pages/Info';

import { PreferencesContext } from './context/PreferencesContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import Major from './pages/Majors';
import Note from './pages/Note';
import Result from './pages/Result';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Tabs = AnimatedTabBarNavigator();



function Calcnav () {
  return(

  <Stack.Navigator initialRouteName="Major">
    <Stack.Screen name="Major" component={Major} options={{headerShown: false}}/>
    <Stack.Screen name="Note" component={Note} options={{headerShown: false}}/>
    <Stack.Screen name="Result" component={Result} options={{headerShown: false}}/>
  </Stack.Navigator>
  )

}
function MyTabs() {
  return (
    <Tabs.Navigator
    // default configuration from React Navigation
    tabBarOptions={{
      activeTintColor: "#fff",
      inactiveTintColor: "#222222",
      activeBackgroundColor: "#8F00FF"
    }}
    appearance={{
        floating: true,
        tabBarBackground:"#ffe3fb"
    }}
  >
        <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calculate"
        component={Calcnav}
        options={{
          tabBarLabel: 'Calculate',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calculator-variant" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size} />
          ),
        }}
      />
  </Tabs.Navigator>
  );
}

const theme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#8F00FF',
    accent: '#f1c40f',
  },
};


export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );


  return (

    // Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </PaperProvider>
    </PreferencesContext.Provider>



    
  );
}


const Stack = createNativeStackNavigator();