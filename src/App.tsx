import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState<Todo[]>(todos);
  const [modalUserId, setModalUserId] = useState<number>(0);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setTodosFiltered(response);
      });
  }, []);

  const handleChoosenTodo = (todoId: number, userId: number) => {
    setModalUserId(userId);
    setSelectedTodoId(todoId);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodosFiltered={setTodosFiltered} todos={todos} />
            </div>

            <div className="block">
              {(todos.length === 0) ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosFiltered}
                  handleChoosenTodo={handleChoosenTodo}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalUserId !== 0 && (
        <TodoModal
          userId={modalUserId}
          handleChoosenTodo={handleChoosenTodo}
          selectedTodoId={selectedTodoId}
          todos={todosFiltered}
        />
      )}
    </>
  );
};
