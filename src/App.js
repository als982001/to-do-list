import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import styled from "styled-components";
import Wastebasket from "./Components/Wastebasket";
import Setting from "./Components/Setting";

const 삭제 = "삭제";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  border: 30px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 50px;
`;

const User = styled.section`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-image: url("https://novelpia.com/imagebox/cover/7ab4e027dcf9afd1dc94d59f104099a8_49023_ori.file");
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [toDos2, setToDos2] = useState(null);

  const onDragEnd = (info) => {
    console.log(info);

    const { destination, source } = info;

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      if (destination.droppableId === 삭제) {
        // 삭제하는 경우

        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);

          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
          };
        });
      } else {
        // cross board movement
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const destinationBoard = [...allBoards[destination.droppableId]];
          const taskObj = sourceBoard[source.index];

          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);

          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  const removeAllToDos = () => {
    setToDos((allBoards) => {
      const cleanBoard = {};

      Object.keys(allBoards).map((key) => (cleanBoard[key] = []));

      return { ...cleanBoard };
    });
  };

  const handleUser = () => {
    return window.open(
      `https://www.google.com/search?q=user&oq=user&aqs=chrome..69i57j69i59l3j69i60l3j5.427j0j1&sourceid=chrome&ie=UTF-8`
    );
  };

  useEffect(() => {
    (async () => {
      const todo = (await fetch("http://localhost:3001/ToDo")).json;
      const doing = await fetch("http://localhost:3001/Doing");
      const done = await fetch("http://localhost:3001/Done");

      console.log(todo);
      console.log(doing);
      console.log(done);
    })();
  }, []);

  // onDragEnd: 유저가 드래그를 끝낸 시점에서 불려지는 함수
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <Wastebasket boardId={"삭제"} key={"삭제"} />
      </Wrapper>
      <User onClick={handleUser} />
      <Setting removeAllToDos={removeAllToDos} />
    </DragDropContext>
  );
}

export default App;
