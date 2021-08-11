import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { _file } from './File';
import {request, PERMISSIONS} from 'react-native-permissions';



const App = () => {
  const createFile = async() => {
    try {
      const name = "test"+Math.random()*10;
      await _file._createFile(name,"test");
      alert("file wrote");
      const file = await _file._getFileStats(name);
      console.log(file);
    } catch (error) {
      console.error(error);
    }
  }
  const requestPermisson = async() => {
    try {
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TouchableOpacity onPress={createFile}>
                <Text style={styles.sectionTitle}>Create File</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={requestPermisson}>
                <Text style={styles.sectionTitle}>Request Permisson</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
