/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var GroupIcon = require('./GroupIcon');
var TodoList = require('./TodoList');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
  },
});

class GroupItem extends React.Component{
  goToTodos(){
    this.props.navigator.push({
      title: this.props.group.name,
      component: TodoList,
      passProps: {
        todos: this.props.group.todos,
      },
    });
  }
  render(){
    return (
      <TouchableHighlight onPress={this.goToTodos.bind(this)} 
                          underlayColor='#E6FFFF'>
        <View style={styles.container}>
          <GroupIcon members={this.props.group.members}/>
          <Text> {this.props.group.name} </Text>
        </View>
      </TouchableHighlight>
    )
  }
};

GroupItem.propTypes = {
  group: React.PropTypes.object.isRequired,
}

module.exports = GroupItem;