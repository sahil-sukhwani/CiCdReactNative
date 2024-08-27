import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Crashes, { hasCrashedInLastSession } from 'appcenter-crashes';
import Analytics from 'appcenter-analytics'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    async function hasCrashedInLastSession() {
      const didCrashed = await Crashes.hasCrashedInLastSession();
      console.log('Crash in last session: ', didCrashed);
      if(didCrashed) {
        Alert.alert('Sorry about the crash, we are working on the fix');
      }
    }
    
    hasCrashedInLastSession()
  },[])

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <Button title="Crash me" onPress={() =>  Crashes.generateTestCrash()} /> */}
      <Button title="Send custom event" onPress={() => Analytics.trackEvent("track_event") } />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
