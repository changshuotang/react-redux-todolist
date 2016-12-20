import React from 'react';

export function Todo(props) {
  const { todo } = props;

  if (!todo.isDone) {
    return (
      <span>
        <span>{todo.text}</span>
      </span>
    );
  }
  else {
    return (
      <span>
        <strike>{todo.text}</strike>
      </span>
    );
  }
}

export function TodoList(props) {
  const { todos, toggleTodo, addTodo, clearCompleted, deleteTodo, togglePriority } = props;

  const onSubmit = (event) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which == 13);
    const isLongEnough = text.length > 0;

    if(isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  };
  const toggleClick = id => event => toggleTodo(id);
  const clearClick = event => clearCompleted();
  const deleteClick = id => event => deleteTodo(id);
  const priorityClick = id => event => togglePriority(id);
  const displayPriority = priority => {
    return priority ? '1' : '2';
  };

  return (
    <div className='todo'>
      <div className="main-app-nav">Simple Redux Todolist</div>
      <input type='text'
             className='todo__entry'
             placeholder='Add todo'
             onKeyDown={onSubmit} />
           <button className='filterButton' onClick={clearClick}>CLEAR</button>
      <ul id='simpleList' className='todo__list'>
        {todos.filter(t => t.get('priority')).filter(t => !t.get('isDone')).map(t => (
          <div className='list-item'>
            <button className='deleteButton' onClick={deleteClick(t.get('id'))}>x</button>
            <button className='urgentTodo' onClick={priorityClick(t.get('id'))}>{displayPriority(t.get('priority'))}</button>
            <li key={t.get('id')}
                className='todo__item'
                onClick={toggleClick(t.get('id'))}>
              <Todo todo={t.toJS()} />
            </li>
          </div>
        ))}

        {todos.filter(t => !t.get('priority')).filter(t => !t.get('isDone')).map(t => (
          <div className='list-item'>
            <button className='deleteButton' onClick={deleteClick(t.get('id'))}>x</button>
            <button className='regularTodo' onClick={priorityClick(t.get('id'))}>{displayPriority(t.get('priority'))}</button>
            <li key={t.get('id')}
                className='todo__item'
                onClick={toggleClick(t.get('id'))}>
              <Todo todo={t.toJS()} />
            </li>
          </div>
        ))}

        {todos.filter(t => t.get('isDone')).map(t => (
          <div className='list-item'>
            <button className='deleteButton' onClick={deleteClick(t.get('id'))}>x</button>
            <button className='regularTodoDone' onClick={priorityClick(t.get('id'))}>{displayPriority(t.get('priority'))}</button>
            <li key={t.get('id')}
                className='todo__item'
                onClick={toggleClick(t.get('id'))}>
              <Todo todo={t.toJS()} />
            </li>
          </div>
        ))}
      </ul>

    </div>
  );
}
