import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

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
  font-size: 20px;
  font-weight: bold;
`;

function DraggableCard({ toDoId, toDoText, index }) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

// React.memo => react에게 prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 말라고 하는 거
export default React.memo(DraggableCard);
