/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var Utils = require('./helpers/Utils')
var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
} = React;
var basicStyles = require('./helpers/Styles');
if (Platform.OS === 'ios') {  
  var ActivityView = require('react-native-activity-view');
}

 var UIImagePickerManager = require('NativeModules').UIImagePickerManager;


var styles = StyleSheet.create({
   imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  }
});

class PhotoItem extends React.Component{
_pressHandler(imgUrl){
  if (Platform.OS === 'android') {
    UIImagePickerManager.shareApp(imgUrl.toString());
  }
  else{
  ActivityView.show({
    text: "Text you want to share",
    imageUrl: imgUrl,
  });
  }
}

  render(){
    return (
  <View style={styles.imageContainer}>
     <TouchableWithoutFeedback
          onLongPress={() => this._pressHandler(this.props.photoUrl)}>
          <Image style={basicStyles.flex1} source={{uri: this.props.photoUrl}}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

PhotoItem.propTypes = {
  photoUrl: React.PropTypes.object.isRequired,
}

module.exports = PhotoItem;