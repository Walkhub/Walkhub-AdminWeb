import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../../common/defaultBtn/DefaultBtn";
import { createClass } from "@src/utils/apis/teachers";
import ToastError from "@src/utils/function/errorMessage";
import axios from "axios";
import { useRouter } from "next/router";
import DropDown from "../../common/dropdown";

type inputType = {
  grade: number;
  class: number;
};

interface optionListType {
  value: string;
  optionName: string;
}

const sortList: optionListType[] = [
  {
    value: "ALL",
    optionName: "전체",
  },
  {
    value: "SCHOOL",
    optionName: "학교",
  },
];

const MakeClass: FC = () => {
  const [classInfo, setClassInfo] = useState<inputType>({
    grade: 0,
    class: 1,
  });

  const router = useRouter();

  const classSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createClass(classInfo.grade, classInfo.class);
      successHandler();
    } catch (e) {
      errorHandler(e);
    }
  };

  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          return ToastError("모든 빈칸을 채워주세요.");
        case 401:
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 없습니다.");
        case 409:
          return ToastError("중복된 클래스입니다.");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  const successHandler = () => {
    router.push("/");
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setClassInfo({
      ...classInfo,
      [name]: value,
    });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setClassInfo({
      ...classInfo,
      [name]: value,
    });
  };

  return (
    <Wrapper onSubmit={classSubmit}>
      <PostBox>
        <p>반 개설하기</p>
        <InputDiv>
          <DropDown
            width={85}
            heigth={40}
            name='grade'
            selectedValue={classInfo.grade}
            setSelectedValue={() => onSelectChange}
            optionList={sortList}
            disabled={false}
            fontSize={16}
            lineHeight={24}
            fontWeight='400'
            padding='8px 10px'
          />
          <p style={{ margin: "20px 28px 0 0" }}>학년</p>
          <input
            name='class'
            type='number'
            onChange={onChange}
            value={classInfo.class}
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
