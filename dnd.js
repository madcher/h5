import React, {useState} from 'react';
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


function App() {
  //items state
  const [order, setOrder] = useState(testArr);

  const onDragEnd = (result) => {

    const { destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    const newOrder = [...order];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, order[source.index]);
    setOrder(newOrder);

  }


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
              {order.map((el, ind) => {
                return (
                  <Draggable index={ind} draggableId={el.name} key={el.name}>
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
