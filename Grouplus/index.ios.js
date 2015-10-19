
'use strict';

var React = require('react-native');
var LoginScreen = require('./app/components/LoginScreen');


//parse database
var Parse = require('parse/react-native');
Parse.initialize("***REMOVED***", "***REMOVED***");

var item = Parse.Object.extend("Listing");
var query = new Parse.Query(item);
var imageList = [];
query.find({
  success: function(results) {
    for (var i = 0; i < results.length; ++i) {
       var object = results[i];
       var imageFile = object.get('img_url');
       //var imageURL = imageFile.url();
       imageList.push(imageFile.url());
    }
           console.log(imageList);
  }
});


// Make react global
window.React = React;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Grouplus = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Grouplus',
          component: LoginScreen, 
        }}
      />
    );
  }
});

AppRegistry.registerComponent('Grouplus', () => Grouplus);
