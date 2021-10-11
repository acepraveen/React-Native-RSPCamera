import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import CameraRoll from '@react-native-community/cameraroll';
import {Stopwatch} from 'react-native-stopwatch-timer';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{fontSize: 33}}>Loading...</Text>
  </View>
);

const App = () => {
  const [image, setImage] = useState(null);
  const [camMode, setCamMode] = useState('back');
  const [flashl, setFlashl] = useState(RNCamera.Constants.FlashMode.off);
  const [camBtnColor, setCamBtnColor] = useState('white');
  const [flashBtnC, setFlashBtnC] = useState('#758283');
  const [videoBtnC, setVideoBtnC] = useState('red');
  const [videoToggle, setVideoToggle] = useState(false);
  const [timer, setTimer] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [exposer, setExposer] = useState(0.5);
  const [bgColor1, setBgColor1] = useState('black');
  const [bgColor2, setBgColor2] = useState('#FF6666');
  const [bgColor3, setBgColor3] = useState('black');
  const [bgColor4, setBgColor4] = useState('black');
  const [bgColor5, setBgColor5] = useState('black');
  const [bgColor6, setBgColor6] = useState('black');
  const [mode, setMode] = useState('camera');
  const [expVal, setExpVal] = useState(0.5);
  const [picMode, setPicMode] = useState(RNCamera.Constants.WhiteBalance.auto);
  const [scanMode, setScanMode] = useState(false);

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {},
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {},
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onBarCodeRead = scanResult => {
    Alert.alert(
      'QR Code is Scanned 🤩',
      '' + scanResult.data,

      [
        {
          text: 'Copy📝',
          onPress: () => Clipboard.setString(scanResult.data),
          style: 'cancel',
        },

        {text: 'Exit❌', onPress: () => console.log('OK Pressed')},
      ],
    );
  };
  const takePicture = async camera => {
    try {
      setExposer(expVal);
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
      const options = {quality: 1};
      CameraRoll.save(data.uri, 'photo');

      setExposer(0.6);
    } catch (error) {
      console.warn(error);
    }
  };

  const Stop = camera => {
    camera.stopRecording();
    setShowTimer(false);
    setTimer(false);
    setVideoBtnC('red');
  };

  const VideoOn = async camera => {
    try {
      if (camera) {
        setVideoBtnC('red');
        setShowTimer(true);
        setTimer(true);
        const {uri, codec = 'mp4'} = await camera.recordAsync();

        console.info(uri);

        const options = {quality: 1};

        CameraRoll.save(uri, 'video');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const flipCam = async camera => {
    try {
      camMode === 'back' ? setCamMode('front') : setCamMode('back');
    } catch (error) {
      console.warn(error);
    }
  };

  const flashLight = async camera => {
    try {
      flashl === RNCamera.Constants.FlashMode.torch
        ? [setFlashl(RNCamera.Constants.FlashMode.off), setFlashBtnC('#758283')]
        : [
            setFlashl(RNCamera.Constants.FlashMode.torch),
            setFlashBtnC('white'),
          ];
    } catch (error) {
      console.warn(error);
    }
  };

  const DATA = [
    {
      id: 3,
    },
  ];

  const renderItem = ({item}) => (
    <View style={{flexDirection: 'row', backgroundColor: 'black', padding: 21}}>
      <TouchableOpacity
        style={{backgroundColor: bgColor1, borderRadius: 6}}
        onPress={() => {
          setMode('video');
          setScanMode(false);

          {
            bgColor1 === 'black'
              ? (setBgColor1('#FF6666'),
                setBgColor2('black'),
                setBgColor3('black'),
                setBgColor4('black'),
                setBgColor5('black'),
                setBgColor6('black'))
              : null;
          }
          showMessage({
            style: {alignSelf: 'center', backgroundColor: 'rgba(255,0,0,0)'},
            titleStyle: {
              color: 'red',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            },
            message: 'Video Mode',
            type: 'success',
            icon: false,
            duration: 100,
            floating: true,
            position: 'center',
          });
        }}>
        <Text style={styles.fItem}> Video </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: bgColor2, borderRadius: 6}}
        onPress={() => {
          setScanMode(false);

          {
            bgColor2 === 'black'
              ? (setBgColor2('#FF6666'),
                setBgColor1('black'),
                setBgColor3('black'),
                setBgColor4('black'),
                setBgColor5('black'),
                setBgColor6('black'),
                setCamBtnColor('white'))
              : null;
          }
          setMode('camera');
          setExpVal(0.5);
          setExposer(0.5);
          showMessage({
            style: {alignSelf: 'center', backgroundColor: 'rgba(255,0,0,0)'},
            titleStyle: {
              color: 'white',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            },
            message: 'Camera Mode',
            type: 'success',
            icon: false,
            duration: 100,
            floating: true,
            position: 'center',
          });
          setPicMode(RNCamera.Constants.WhiteBalance.auto);
        }}>
        <Text style={styles.fItem}> Camera </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: bgColor3, borderRadius: 6}}
        onPress={() => {
          setScanMode(false);

          setMode('camera');
          setExpVal(0.7);
          setExposer(0.7);
          {
            bgColor3 === 'black'
              ? (setBgColor3('#FF6666'),
                setBgColor1('black'),
                setBgColor2('black'),
                setBgColor4('black'),
                setBgColor5('black'),
                setBgColor6('black'),
                setCamBtnColor('#E03B8B'))
              : null;
          }
          showMessage({
            style: {alignSelf: 'center', backgroundColor: 'rgba(255,0,0,0)'},
            titleStyle: {
              color: '#E03B8B',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            },
            message: 'Beauty Mode',
            type: 'success',
            icon: false,
            duration: 100,
            floating: true,
            position: 'center',
          });

          setPicMode(RNCamera.Constants.WhiteBalance.auto);
        }}>
        <Text style={styles.fItem}> Beauty </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: bgColor4, borderRadius: 6}}
        onPress={() => {
          setScanMode(false);

          setMode('camera');
          setExpVal(0.7);
          setExposer(0.7);
          {
            bgColor4 === 'black'
              ? (setBgColor4('#FF6666'),
                setBgColor2('black'),
                setBgColor3('black'),
                setBgColor1('black'),
                setBgColor5('black'),
                setBgColor6('black'),
                setCamBtnColor('#F7CD2E'))
              : null;
          }
          showMessage({
            style: {alignSelf: 'center', backgroundColor: 'rgba(255,0,0,0)'},
            titleStyle: {
              color: '#F7CD2E',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            },
            message: 'Sunny Mode',
            type: 'success',
            icon: false,
            duration: 100,
            floating: true,
            position: 'center',
          });

          setPicMode(RNCamera.Constants.WhiteBalance.sunny);
        }}>
        <Text style={styles.fItem}> Sunny </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: bgColor6, borderRadius: 6}}
        onPress={() => {
          setScanMode(false);

          setMode('camera');
          setExpVal(0.7);
          setExposer(0.7);
          {
            bgColor6 === 'black'
              ? (setBgColor4('black'),
                setBgColor2('black'),
                setBgColor3('black'),
                setBgColor1('black'),
                setBgColor5('black'),
                setBgColor6('#FF6666'),
                setCamBtnColor('#03C6C7'))
              : null;
          }
          showMessage({
            style: {alignSelf: 'center', backgroundColor: 'rgba(255,0,0,0)'},
            titleStyle: {
              color: '#03C6C7',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            },
            message: 'Cloudy Mode',
            type: 'success',
            icon: false,
            duration: 100,
            floating: true,
            position: 'center',
          });

          setPicMode(RNCamera.Constants.WhiteBalance.fluorescent);
        }}>
        <Text style={styles.fItem}> Cloudy </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: bgColor5, borderRadius: 6}}
        onPress={() => {
          setScanMode(true);
          setMode('camera');
          setExpVal(0.5);
          setExposer(0.5);
          {
            bgColor5 === 'black'
              ? (setBgColor5('#FF6666'),
                setBgColor2('black'),
                setBgColor3('black'),
                setBgColor4('black'),
                setBgColor1('black'),
                setBgColor6('black'),
                setCamBtnColor('#5A20CB'))
              : null;
          }
          showMessage({
            style: {alignSelf: 'center', backgroundColor: 'rgba(255,0,0,0)'},
            titleStyle: {
              color: '#5A20CB',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            },
            message: 'Scan Mode',
            type: 'success',
            icon: false,
            duration: 100,
            floating: true,
            position: 'center',
          });

          setPicMode(RNCamera.Constants.WhiteBalance.auto);
        }}>
        <Text style={styles.fItem}> Scan </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        onBarCodeRead={onBarCodeRead.bind(this)}
        //barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}

        style={styles.preview}
        type={camMode}
        useNativeZoom={true}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        captureAudio={true}
        flashMode={flashl}
        playSoundOnCapture={false}
        playSoundOnRecord={false}
        whiteBalance={picMode}
        exposure={exposer}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <SafeAreaView>
              <View style={{flexDirection: 'row'}}>
                {showTimer ? <Stopwatch laps secs start={timer} /> : null}

                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    flex: 1,
                    alignItems: 'flex-end',
                  }}
                  onPress={() => {
                    showMessage({
                      message:
                        'Developed with ❤️ by Praveen(Techasoft). Share ur feedback at praveen@techasoft.com',
                      type: 'success',
                      icon: 'success',
                      duration: 5000,
                    });
                  }}>
                  <Text style={styles.btnTxt}>😊</Text>
                </TouchableOpacity>
              </View>
              {scanMode ? (
                <View
                  style={{
                    flex: 1,
                    marginTop: '45%',
                    borderLeftWidth: 2,
                    borderColor: 'white',
                    borderRightWidth: 1,
                    marginHorizontal: '5%',
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Place camera on Code
                  </Text>
                  <Icon
                    name="qrcode"
                    size={400}
                    style={{alignSelf: 'center', color: 'white'}}
                  />
                </View>
              ) : null}

              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: 'black',
                    elevation: 33,
                    alignContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => flashLight(camera)}>
                    <Text style={styles.btnTxt}>
                      <Icon1 name="flash-outline" size={30} color={flashBtnC} />
                    </Text>
                  </TouchableOpacity>

                  {mode == 'camera' ? (
                    <TouchableOpacity
                      style={styles.capture}
                      onPress={() => [takePicture(camera), permission()]}
                      onPressOut={() => {
                        showMessage({
                          style: {
                            alignSelf: 'center',
                            backgroundColor: 'rgba(255,0,0,0)',
                          },
                          titleStyle: {
                            color: 'white',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 17,
                          },
                          message: 'Clicked',
                          type: 'success',
                          icon: false,
                          duration: 10,
                          floating: true,
                          position: 'center',
                        });
                      }}>
                      <Text style={styles.btnTxt}>
                        {camMode === 'back' ? (
                          <Icon name="circle-o" size={70} color={camBtnColor} />
                        ) : (
                          <Icon name="circle-o" size={70} color={camBtnColor} />
                        )}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  {mode == 'video' ? (
                    <TouchableOpacity style={styles.capture}>
                      {videoToggle ? (
                        <TouchableOpacity
                          onPress={() => [
                            Stop(camera),
                            setVideoToggle(!videoToggle),
                          ]}>
                          <Text style={styles.btnTxt}>
                            <Icon name="circle" size={70} color={videoBtnC} />
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => [
                            VideoOn(camera),
                            setVideoToggle(!videoToggle),
                          ]}>
                          <Text style={styles.btnTxt}>
                            <Icon name="circle-o" size={70} color={videoBtnC} />
                          </Text>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => flipCam(camera)}>
                    <Text style={styles.btnTxt}>
                      <Icon1 name="sync" size={30} color="white" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </SafeAreaView>
          );
        }}
      </RNCamera>

      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E43',
  },
  capture: {
    flex: 1,

    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  camtext: {
    backgroundColor: '#3498db',
    color: 'white',

    width: '100%',

    textAlign: 'center',

    fontSize: 25,
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  clicked: {
    borderRadius: 1,
  },
  fItem: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    color: 'white',

    fontSize: 18,
  },
});
