import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { basicTheme } from "../theme";

const Btn = styled(motion.aside)`
  position: absolute;
  right: 50px;
  bottom: 50px;
  width: 100px;
  height: 70px;
  border-radius: 20%;
  background-color: ${(props) => props.theme.boardColor};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  transition: scale 0.2s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

const Overlay = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.1;
  width: 100vw;
  height: 100vh;
`;

const Container = styled(motion.section)`
  width: 450px;
  height: 300px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.boardColor};
  position: absolute;
  right: 100px;
  bottom: 100px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  padding: 10px;
  display: grid;
  grid-template-rows: 1fr repeat(4, 2fr);
  gap: 5px;
`;

const SettingLine = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SettingName = styled.h5`
  font-size: 20px;
  font-weight: bold;
`;

const Colors = styled.section`
  padding-left: 20px;
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Color = styled.section`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
  border: 0.5px black solid;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:hover {
    scale: 1.2;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const ResetBtn = styled.section`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8dcbe6;
  font-size: 12px;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Title = styled.h4`
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const bgColors = ["#bf9742", "red", "blue"];
const boardColors = ["#EEEEEE", "red", "blue"];
const cardColors = ["#FCF6B0", "red", "blue"];

export default function Setting({ removeAllToDos }) {
  const [isSetting, setIsSetting] = useState(false);

  const handleSetting = () => {
    setIsSetting((prev) => !prev);
  };

  return (
    <>
      <Btn layoutId={"setting"} onClick={handleSetting}>
        <h5>Setting</h5>
      </Btn>
      <AnimatePresence>
        {isSetting ? (
          <>
            <Overlay onClick={handleSetting} />
            <Container layoutId={"setting"}>
              <Title>Setting</Title>
              <SettingLine>
                <SettingName>Background Color</SettingName>
                <Colors>
                  {bgColors.map((bgColor, index) => (
                    <Color key={bgColor} color={bgColor} />
                  ))}
                </Colors>
              </SettingLine>
              <SettingLine>
                <SettingName>Board Color</SettingName>
                <Colors>
                  {boardColors.map((boardColor) => (
                    <Color key={boardColor} color={boardColor} />
                  ))}
                </Colors>
              </SettingLine>
              <SettingLine>
                <SettingName>Memo Color</SettingName>
                <Colors>
                  {cardColors.map((cardColor) => (
                    <Color key={cardColor} color={cardColor} />
                  ))}
                </Colors>
              </SettingLine>
              <SettingLine style={{ justifyContent: "center" }}>
                <ResetBtn onClick={removeAllToDos}>메모 전부 삭제</ResetBtn>
              </SettingLine>
            </Container>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
