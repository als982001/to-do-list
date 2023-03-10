import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: 200px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 30px;
`;

const Area = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver ? props.theme.draggingOverColor : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

function Wastebasket({ boardId }) {
  return (
    <Wrapper>
      <Title>Remove</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          ></Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Wastebasket;
