import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Overlay = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Revision = styled.section`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 500px;
  height: 200px;
  background-color: white;
  z-index: 2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff3e2;
`;

const RevisionLine = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
`;

const RevisionInput = styled.input`
  width: 200px;
  height: 35px;
  padding-left: 20px;
  border: none;
  border-radius: 10px;
  background-color: #ffe5ca;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const RevisionBtn = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  background-color: #f3deba;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Card = styled.div`
  border-radius: 20px;
  margin-bottom: 5px;
  padding: 10px 10px 10px 20px;
  background-color: ${(props) =>
    props.isDragging ? props.theme.draggingColor : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 2px 5px rgba(0, 0, 0, 0.05)"
      : "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"};

  font-weight: bold;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.h6`
  font-size: ${(props) => props.fontSize};
  margin: 0 20px;
`;

const Additional = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.section`
  &:hover {
    scale: 1.2;
  }
`;

function DraggableCard({ index, toDo, boardId }) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [startRevise, setStartRevise] = useState(false);
  const [revisedContent, setRevisedContent] = useState("");

  const handleRevise = () => {
    if (revisedContent === "") return;

    setStartRevise((prev) => true);

    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      const revised = { ...toDo, text: revisedContent };

      boardCopy[index] = revised;

      return { ...allBoards, [boardId]: boardCopy };
    });

    setRevisedContent((prev) => "");
  };

  const handleOverlay = () => {
    setStartRevise((prev) => !prev);
  };

  const handleRevisionContent = (event) => {
    setRevisedContent((prev) => event.target.value);
  };

  return (
    <>
      <Draggable draggableId={toDo.id + ""} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            <Text fontSize={"20px"}>{toDo.text}</Text>
            <Additional>
              <Text fontSize={"10px"}>{toDo.createdAt}</Text>
              <Icon>
                <FontAwesomeIcon icon={faPenToSquare} onClick={handleOverlay} />
              </Icon>
            </Additional>
          </Card>
        )}
      </Draggable>
      {startRevise ? (
        <>
          <Overlay onClick={handleOverlay} />
          <Revision>
            <RevisionLine>{`현재 내용: ${toDo.text}`}</RevisionLine>
            <RevisionLine
              style={{
                justifyContent: "space-around",
              }}
            >
              <RevisionInput
                onChange={handleRevisionContent}
                placeholder="수정할 내용을 입력하세요."
              />
              <RevisionBtn onClick={handleRevise}>수정</RevisionBtn>
            </RevisionLine>
          </Revision>
        </>
      ) : null}
    </>
  );
}

// React.memo => react에게 prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 말라고 하는 거
export default React.memo(DraggableCard);
