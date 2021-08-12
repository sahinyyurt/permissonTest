import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImagePickerIOS
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { _file } from './File';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchImageLibrary} from "react-native-image-picker";
import { VideoPlayer,ProcessingManager } from 'react-native-video-processing';

const App = () => {
  const [uri, setUri] = React.useState(null);
  const video = React.useRef(null);

  const onButtonPress = React.useCallback((type, options) => {
      launchImageLibrary({
        selectionLimit: 0,
        mediaType: 'video',
      }, async (res) => {
        console.log(res);
        setUri(res.assets[0].uri);
        const info = await ProcessingManager.getVideoInfo(res.assets[0].uri);
        console.log(info);
      });
  }, []);
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
  const getInfo = async() => {
    console.log(await video.current?.getVideoInfo());
  }; 
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
              <TouchableOpacity onPress={onButtonPress}>
                <Text style={styles.sectionTitle}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={getInfo}>
                <Text style={styles.sectionTitle}>Get Video Info</Text>
              </TouchableOpacity>
            </View>
            <VideoPlayer
                    ref={video}
                    startTime={0}  // seconds
                    endTime={10}   // seconds
                    play={true}     // default false
                    replay={true}   // should player play video again if it's ended
                    rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
                    source={uri}
                    playerWidth={300} // iOS only
                    playerHeight={500} // iOS only
                    style={{ width:200,height:200}}
                    resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                />
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
