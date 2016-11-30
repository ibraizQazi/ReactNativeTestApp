'use strict';
var ProgressBar = require('ProgressBarAndroid');
import React, {
  AppRegistry,
  Component,
  BackAndroid,
  ToolbarAndroid,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

var AwesomePage = require('./AwesomePage');
var SplashPage = require('./SplashPage');


class AwesomeProject extends Component {

 render() {
   return(
     <Navigator
        style={styles.container}
        initialRoute={{id: 'SplashPage', title: 'Splash Screen'}}
        renderScene={this.navigatorRenderScene}
      />
    );
 }
 navigatorRenderScene(route, navigator) {
    //_navigator = navigator;
    switch (route.id) {
      case 'SplashPage':
        return (<SplashPage navigator={navigator} title="SplashPage"/>);
      case 'AwesomePage':
        return (<AwesomePage navigator={navigator} title="AwesomePage" />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
