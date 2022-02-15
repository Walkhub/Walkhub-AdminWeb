import React from "react";
import styled from "@emotion/styled";

const StudentForm = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
`;

export default StudentForm;
