import React, {useState} from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const data = {
  tasks: {
    'task-1': {id: 'task-1', name: 'task-1'},
    'task-2': {id: 'task-2', name: 'task-2'},
    'task-3': {id: 'task-3', name: 'task-3'},
    'task-4': {id: 'task-4', name: 'task-4'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'To do',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
}



function App() {
  //items state
  const [columns, setColumns] = useState(data.columns);


  // order function after drag end
  const onDragEnd = (result) => {

        const { destination, source, draggableId} = result;

        if (!destination) {
          return;
        }

        const newColumns = {...columns};
        if (source.droppableId === destination.droppableId) {
          newColumns[destination].taskIds.splice(source.index, 1);
          newColumns[source].taskIds.splice(destination.index, 0, draggableId);
          setColumns(newColumns);
        }

        newColumns[source.droppableId].taskIds.splice(source.index, 1);
        newColumns[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <header> Header </header>
        <div className="container">
        <Droppable droppableId={data.columnOrder[0]}>
        {
          (provided) => (
            <div
              className='column'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns['column-1'].taskIds.map((el, ind) => {
                const task = data.tasks[el];
                return (
                  <Draggable index={ind} draggableId={task.id} key={task.id}>
                    {
                      (provided) => (
                        <div
                          className="list"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {task.name}
                        </div>
                      )
                    }
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )
        }
        </Droppable>
        <Droppable droppableId={data.columnOrder[1]}>
        {
          (provided) => (
            <div
              className='column'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns['column-2'].taskIds.map((el, ind) => {
                const task = data.tasks[el];
                return (
                  <Draggable index={ind} draggableId={task.id} key={task.id}>
                    {
                      (provided) => (
                        <div
                          className="list"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {task.name}
                        </div>
                      )
                    }
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )
        }
        </Droppable>
        </div>
    </DragDropContext>
  );
}

export default App;
