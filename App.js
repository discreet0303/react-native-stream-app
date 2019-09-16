/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import {  NodeCameraView } from 'react-native-nodemediaclient';
import {  NodePlayerView } from 'react-native-nodemediaclient';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPublish: false,
      publishBtnTitle: 'test'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NodeCameraView 
          style={{ height: 400 }}
          ref={(vb) => { this.vb = vb }}
          outputUrl = {"rtmp://192.168.0.10/live/stream"}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
          autopreview={true}
        />
        <Button
          onPress={() => {
            if (this.state.isPublish) {
              this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
              this.vb.stop();
            } else {
              this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
              this.vb.start();
            }
          }}
          title={this.state.publishBtnTitle}
          color="#841584"
        />
        {/* <NodePlayerView 
          style={{ height: 200 }}
          ref={(vp) => { this.vp = vp }}
          inputUrl={"rtmp://192.168.0.10/live/stream"}
          scaleMode={"ScaleAspectFit"}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
