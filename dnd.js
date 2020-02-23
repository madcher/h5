import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


let testArr = [
  {
    name: 'a1',
    content: 'test1'
  },
  {
    name: 'a2',
    content: 'test2'
  },
  {
    name: 'a3',
    content: 'test3'
  }
]

const onDragEnd = () => {
  console.log('end');
}


function App() {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <header> Header </header>
        <Droppable droppableId="drop">
        {
          (provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {testArr.map((el, ind) => {
                return (
                  <Draggable index={ind} draggableId={el.name}>
                    {
                      (provided) => (
                        <div
                          className="list"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {el.content}
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
    </DragDropContext>
  );
}

export default App;
