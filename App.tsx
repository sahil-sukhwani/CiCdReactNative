import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Switch,
} from 'react-native';

import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    async function checkCrashStatus() {
      const didCrashed = await Crashes.hasCrashedInLastSession();
      console.log('Crash in last session: ', didCrashed);
      if (didCrashed) {
        Alert.alert('Sorry about the crash, we are working on the fix');
      }
    }

    checkCrashStatus();
  }, []);

  const toggleSwitch = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text style={[styles.text, { color: isDarkMode ? Colors.lighter : Colors.darker }]}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        trackColor={{ false: Colors.lighter, true: Colors.darker }}
        thumbColor={isDarkMode ? Colors.lighter : Colors.darker}
        ios_backgroundColor={Colors.lighter}
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
      <Button title="Send custom event" onPress={() => Analytics.trackEvent("track_event")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
