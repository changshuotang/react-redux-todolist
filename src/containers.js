import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo, clearCompleted, deleteTodo, togglePriority } from './actions';

export const TodoList = connect(
  function mapStateToProps(state) {
    return { todos : state};
  },
  function mapDispatchToProps(dispatch) {
    return {
      addTodo: text => dispatch(addTodo(text)),
      toggleTodo: id => dispatch(toggleTodo(id)),
      clearCompleted: () => dispatch(clearCompleted()),
      deleteTodo: id => dispatch(deleteTodo(id)),
      togglePriority: id => dispatch(togglePriority(id))
    };
  }
)(components.TodoList);

