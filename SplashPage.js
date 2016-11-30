'use strict';


var React = require('react-native');
var {
  Component,
  View,
  Navigator,
  BackAndroid,
  ToolbarAndroid,
  Text,
} = React;

var AwesomePage = require('./AwesomePage');

class SplashPage extends Component {

  componentWillMount() {

     setTimeout(() => {
       //console.log("in setTimeout() func:");
       this.props.navigator.push({
         title: 'Awesome Page',
         id: 'AwesomePage'
       })

     }, 2000);
   }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#00ffff', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Just React-ing</Text>
      </View>
    );
  }

}

module.exports = SplashPage;
