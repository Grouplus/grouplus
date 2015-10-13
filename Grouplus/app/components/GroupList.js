/**
 * Display a list of groups
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var GroupItem = require('./GroupItem')
var mockdata = require('../utils/MockData');

var {
  View,
  ListView,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
});

class GroupList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(mockdata.groups),
    }
  }
  _renderRow(rowData) {
    return (
        <View>
          <GroupItem group={rowData} >
          <Separator/>
        </View>
      );
  }
  render(){
    return (
      <ListView
        styles
        dataSource={this.state.dataSource}
        renderRow={this._renderRow} 
      />
    );
  }
};

module.exports = GroupList;