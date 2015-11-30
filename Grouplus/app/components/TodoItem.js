/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var moment = require('moment');
var People = require('./People');

var {
  Text,
  View,
  StyleSheet,
} = React;


var { Icon } = require('react-native-icons');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    margin: 3,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    flex: 5,
    textAlign: 'left',
    marginTop: 5,
  },
  titleHigh: {
    fontSize: 18,
    flex: 5,
    textAlign: 'left',
    color: 'red',
    marginTop: 5,
  },
  titleMedium: {
    fontSize: 18,
    flex: 5,
    textAlign: 'left',
    color: 'orange',
    marginTop: 5,
  },
  info: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },  
  info1: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dueDate: {
    fontSize: 16,
    color: 'black',
    marginTop: 7,
  },
  dueDatePast: {
    fontSize: 16,
    color: 'red',
    marginTop: 7,
  },
  individual: {
    fontSize: 10,
    color: 'grey',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

class TodoItem extends React.Component{
  render(){
    var todo = this.props.todo;
    var dueDate = todo.dueDate ? moment(todo.dueDate).format('MMM D') : '';
    var individual = todo.individual ? "material|account" : "material|accounts";
    var todoStyle = styles.title;
    if(todo.priority === "1"){
      todoStyle = styles.titleHigh;
    }
    if(todo.priority === "2"){
      todoStyle = styles.titleMedium;
    }
    var dueDateStyle = styles.dueDate;
    if(todo.dueDate < new Date()) {
      dueDateStyle = styles.dueDatePast;
    }
    return (
      <View style={styles.container}>
        <View style={styles.info1}>
        <Text style={todoStyle}> {todo.name} </Text>
        <Icon 
            name={individual}
            size={28} 
            color={'#ccc'} 
            style={styles.icon}/>
        </View>
        <View style={styles.info}>
      
          <Text style={dueDateStyle}> {dueDate} </Text>
          <People people={todo.whoAreDone} />
        </View>
      </View>
    );
  }
};

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
}

module.exports = TodoItem;