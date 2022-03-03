import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";

interface PropsType {
  selectedPage: number;
  onClick: (e: number) => void;
  lastPage: number;
}

const PageNation: React.FC<PropsType> = ({
  selectedPage,
  onClick,
  lastPage,
}) => {
  const [startNum, setStartNum] = useState(1);
  const PageList = useMemo(() => {
    return Array(3)
      .fill(void 0)
      .map(
        (item, index) =>
          startNum + index < lastPage && (
            <PageNationButton
              className={selectedPage === startNum + index ? "selected" : ""}
              onClick={() => onClick(startNum + index)}
              key={index}
            >
              {startNum + index}
            </PageNationButton>
          )
      );
  }, [selectedPage, onClick, startNum, lastPage]);
  useEffect(() => {
    if (startNum + 3 >= lastPage) setStartNum(lastPage - 2);
    else if (startNum - 3 < 1) setStartNum(1);
  }, [startNum, lastPage]);
  const onClickSeeMoreButton = (type: SeeMoreType) => {
    if (type === "seePrev") {
      setStartNum(startNum - 3);
      onClick(startNum - 1);
    } else if (type === "seeNext") {
      setStartNum(startNum + 3);
      onClick(startNum + 3);
    }
  };
  if (lastPage < 1) return <></>;
  return (
    <Wrapper className='pageNation'>
      {startNum > 3 && (
        <PageNationButton
          className={selectedPage === 1 ? "selected" : ""}
          onClick={() => onClick(1)}
        >
          1
        </PageNationButton>
      )}
      {startNum > 2 && (
        <SeeMoreButton type='seePrev' onClickSeeMore={onClickSeeMoreButton} />
      )}
      {PageList}
      {startNum < lastPage - 3 && (
        <SeeMoreButton type='seeNext' onClickSeeMore={onClickSeeMoreButton} />
      )}
      <PageNationButton
        className={selectedPage === lastPage ? "selected" : ""}
        onClick={() => onClick(lastPage)}
      >
        {lastPage}
      </PageNationButton>
    </Wrapper>
  );
};
export default PageNation;

export type SeeMoreType = "seePrev" | "seeNext";

const SeeMoreButton: React.FC<{
  onClickSeeMore: (type: SeeMoreType) => void;
  type: SeeMoreType;
}> = ({ onClickSeeMore, type }) => {
  return (
    <SeeMore onClick={() => onClickSeeMore(type)}>
      <div className='dot' />
      <div className='dot' />
      <div className='dot' />
    </SeeMore>
  );
};

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  > .selected {
    background-color: #57b4f1;
    color: #ffffff;
  }
`;
const PageNationButton = styled.li`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  list-style: none;
  color: #57b4f1;
  margin-right: 16px;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  border: 1px solid #57b4f1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
`;

const SeeMore = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 16px;
  background-color: transparent;
  cursor: pointer;
  > .dot {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: #57b4f1;
    margin-right: 4px;
    :last-child {
      margin-right: 0;
    }
  }
`;
