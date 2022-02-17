import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../../common/defaultBtn/DefaultBtn";

type inputType = {
  grade: number;
  Class: number;
};

const MakeClass: FC = () => {
  const [input, setInput] = useState<inputType>({
    grade: 0,
    Class: 1,
  });

  const { grade, Class } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const data = { grade: grade, class: Class };

  return (
    <Wrapper>
      <PostBox>
        <p>반 개설하기</p>
        <InputDiv>
          <select name='grade' onChange={onSelectChange} value={input.grade}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
          <p style={{ margin: "20px 28px 0 0" }}>학년</p>
          <input
            name='Class'
            type='number'
            onChange={onChange}
            value={input.Class}
          />
          <p style={{ margin: "20px 0 0 0 " }}>반</p>
        </InputDiv>
        <DefaultBtn>개설</DefaultBtn>
      </PostBox>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  width: 392px;
  height: 522px;
  padding: 80px 63px 141px;
  border-radius: 12px;
  background: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
  }
`;

const InputDiv = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 78px;
  display: flex;
  justify-content: center;
  > select {
    width: 83px;
    height: 48px;
    padding: 0 0 0 20px;
    margin-right: 12px;
    border: 1px solid ${({ theme }) => theme.color.normal_gray};
    border-radius: 12px;
  }
  > input {
    width: 83px;
    height: 48px;
    padding: 0 0 0 20px;
    margin-right: 12px;
    border: 1px solid ${({ theme }) => theme.color.normal_gray};
    border-radius: 12px;
  }
`;

export default MakeClass;
