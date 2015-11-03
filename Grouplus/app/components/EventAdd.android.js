'use strict';
/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
Parse.initialize("***REMOVED***", "***REMOVED***");


var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  NativeModules,
} = React;



var styles = StyleSheet.create({ 
    container: {
      flex: 20,
      flexDirection: 'row',
      height: 70,
      margin: 3,
      justifyContent: 'space-between',
    },
    instructions: {
      textAlign: 'left',
      color: '#333333',
      margin: 5,
    },
    event: {
        marginTop: 10,
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    saveButton: {
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    TextInput:{
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1
    },
});

class EventCreation extends React.Component{
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {

        };
    }

handleClickstartDate() {
       var that=this;
      NativeModules.DateAndroid.showDatepicker(function() {}, function(date) {
        that.setState({startdate: date})
      });
    }

handleClickendDate() {
       var that=this;
      NativeModules.DateAndroid.showDatepicker(function() {}, function(date) {
        that.setState({enddate: date})
      });
    }

handleClickstartTime() {
       var that=this;
      NativeModules.DateAndroid.showTimepicker(function() {}, function(date) {
        that.setState({starttime: date})
      });
    }

handleClickendTime() {
       var that=this;
      NativeModules.DateAndroid.showTimepicker(function() {}, function(date) {
        var month=date.getMonth();
        that.setState({endtime: month})
      });
    }

onUpdate() {
    var that = this;
    var creator = ParseReact.Mutation.Create('Event', {
        name: that.state.name,
        createdBy: ParseReact.currentUser.id,
        location: that.state.location,
        groupId: that.props.groupId, 
        dueDate: that.state.startdate,
        enddate: that.state.enddate
    });
        creator.dispatch();
        this.props.modal.close();
  }

  render(){
    return (
            <ScrollView style={styles.event}> 
                <Text style={styles.events}>
                    Enter you event name
                </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({name: text})}
                 value={this.state.name}
                />
                <Text style={styles.events}>
                    Enter you event location
                </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({location: text})}
                 value={this.state.location}
                />
                <Text style={styles.events}>
                    Start Time
                </Text>
                <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickstartDate.bind(this)}>
                 <Text style={styles.instructions}>
                   Select Start Date
                 </Text>
                 </TouchableOpacity>
                 <Text style={styles.events}>
                    {this.state.startdate}
                </Text>
                </View>
                <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickstartTime.bind(this)}>
                 <Text style={styles.instructions}>
                   Select Start Time
                 </Text>
                 </TouchableOpacity>
                 <Text style={styles.events}>
                    {this.state.starttime}
                </Text>
                </View>
                <Text style={styles.events}>
                    End Time
                 </Text>
                 <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickendDate.bind(this)}>
                 <Text style={styles.instructions}>
                   Select End Date
                 </Text>
                 </TouchableOpacity>
                 <Text style={styles.events}>
                    {this.state.enddate}
                </Text>
                </View>
                <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickendTime.bind(this)}>
                 <Text style={styles.instructions}>
                   Select End Time
                 </Text>
                 </TouchableOpacity>
                 <Text style={styles.events}>
                    {this.state.endtime}
                </Text>
                </View>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate.bind(this)}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
                <Text>
                {this.state.enddate.getDate()}
                </Text>
            </ScrollView>
    )
  }
}

module.exports = EventCreation;