import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppNavigator from './Components/AppNavigator';
import { AuthProvider } from './Components/Context/Context';
import { StudentProvider } from './Components/Context/StudentConext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Store from './Components/Redux/Store';
import { Provider } from 'react-redux';
import { checkVersion } from 'react-native-check-version';
import DeviceInfo from 'react-native-device-info';
import { StudentDetailsProvider } from './Components/Context/StudentDetailsContext';
import ForceUpdateModal from './Components/ForceUpdate';



import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const currentVersion = DeviceInfo.getVersion();
  const [forceUpdateVisible, setForceUpdateVisible] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const currentVersion = DeviceInfo.getVersion();
        const version = await checkVersion();
        
        console.log(version.version,currentVersion);
        if (version.needsUpdate) {
          console.log(version.version,currentVersion);
          setLatestVersion(version.version);
          setForceUpdateVisible(true);
         
        } else {
          console.log('App is up to date.');
          setLatestVersion(version.version);
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    };
    checkForUpdates();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Provider store={Store}>
          <AuthProvider>
            <StudentProvider>
              <StudentDetailsProvider>
                {!forceUpdateVisible ? (
                  <AppNavigator />
                ) : (
                  <ForceUpdateModal
                    isVisible={forceUpdateVisible}
                    latestVersion={latestVersion}
                    onClose={() => setForceUpdateVisible(false)}
                    whatsNew={'new features are added'}
                  />
                )}
              </StudentDetailsProvider>
            </StudentProvider>
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
