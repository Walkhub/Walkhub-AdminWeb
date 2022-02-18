import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import React from "react";

const ClassCard = () => {
  return (
    <>
      <DefaultBox width={288} height={100}>
        <div style={{ fontSize: "20px", fontWeight: 500 }}>2학년 1반</div>
        <ClassInfo>
          <div>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/PM5544_with_non-PAL_signals.png/300px-PM5544_with_non-PAL_signals.png'
              alt='반'
            />
            <p>찬익좌</p>
          </div>
          <div>21명</div>
        </ClassInfo>
      </DefaultBox>
    </>
  );
};

export default ClassCard;

const ClassInfo = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 5px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }
`;
