/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var Parse = require('parse/react-native');
var mockdata = require('../utils/MockData.js');
//var twoUrls = ['http://files.parsetfss.com/00e842b6-2777-4203-a28f-7407fe7b3df1/tfss-972caa39-ccf6-41df-aa45-7cc7824a460d-molang2.jpg', 'http://files.parsetfss.com/00e842b6-2777-4203-a28f-7407fe7b3df1/tfss-cad0ee32-3742-4feb-aa8a-31a678add2ea-molang0.jpg']

Parse.initialize("***REMOVED***", "***REMOVED***");

var item = Parse.Object.extend("GroupPhotos");
var photoItem = new item();
var query = new Parse.Query(item);
var imageList = [];
query.find({
  success: function(results) {
    for (var i = 0; i < results.length; ++i) {
       var object = results[i];
       var imageFile = object.get('imgFile');
       imageList.push(imageFile.url());
    }
  }
});


var {
  TouchableHighlight,
  StyleSheet,
  ListView,
  Component,
  Image,
  View,
  Text,
} = React;

var options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  maxWidth: 100,
  maxHeight: 100,
  quality: 0.2,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};

var styles = StyleSheet.create({  
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  img:{
    flex: 1
  },
  stub: {
    margin:50,
    fontSize: 45
  },
   list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        margin: 3,
        height: 100,
        width: 100
    }
});

var TestCmp = React.createClass({
  render: function() {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={{uri: 'http://lorempixel.com/200/400/sports/5/![enter image description here][2]'}} />
      </View>
    );
  }
});


class Photos extends React.Component{

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = { 
      dataSource: this.ds.cloneWithRows(imageList),
    }
  }
  onPressRow(group) {
    this.props.navigator.push({
      title: group.name,
      component: GroupPanel,
      passProps: {
        group: group,
      },
    });
  }
  imageOptions() {
    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {

      if (didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          // You can display the image using either:
          const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
          //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
          var file = new Parse.File('mockphoto7.jpg', {base64: response.data}, 'image/jpeg');
          photoItem.set("description", "mytest");
          photoItem.set("uploadedBy", "Emma Zhang");
          photoItem.set("imgFile", file);

      photoItem.save(null, {
      success: function(photoItem) {
        // Execute any logic that should take place after the object is saved.
        var added = photoItem.get('imgFile').url();
        imageList.push(added);
        alert(added);
        //alert('New photo added with objectId: ' + photoItem.imgFile.url());

      },
      error: function(photoItem, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Pictures failed');     
      }
      });

          this.setState({
            avatarSource: source
          });
        }
      }
    });
  }
//<Image source={this.state.avatarSource} style={styles.uploadAvatar} />

  renderFooter(){
    return (
      <TouchableHighlight onPress={this.imageOptions.bind(this)}>
        <Text>Take Photo</Text>
      </TouchableHighlight>
      );
  }

  render(){

    return (
       <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderFooter={this.renderFooter.bind(this)}
          renderRow={(imageList) => <Image style={styles.item} source={{uri: imageList}}/>} />
    );
  }
};

module.exports = Photos;