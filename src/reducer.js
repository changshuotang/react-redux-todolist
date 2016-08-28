import { List, Map } from 'immutable';

const init = List([]);

export default function(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return todos.push(Map(action.payload));
    case 'TOGGLE_TODO':
      return todos.map(t => {
        if(t.get('id') === action.payload) {
          return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });
    case 'CLEAR_COMPLETED':
      return todos.filter(t => !t.get('isDone'));
    case 'DELETE_TODO':
      return todos.filter(t => t.get('id') != action.payload);
    case 'TOGGLE_PRIORITY':
      return todos.map(t => {
        if(t.get('id') === action.payload) {
          return t.update('priority', priority => !priority);
        } else {
          return t;
        }
      });
    default:
      return todos;
  }
}
