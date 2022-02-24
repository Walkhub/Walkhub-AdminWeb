import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import Map from "./Map";
interface Props {
  isRight?: boolean;
  id: number;
}

const MeasurementCard: React.FC<Props> = ({ isRight = false, id }) => {
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  return (
    <CardContainer
      onMouseEnter={() => setMapOpen(true)}
      onMouseLeave={() => setMapOpen(false)}
    >
      <CardBox isRight={isRight}>
        {isRight && <Map id={id} isOpen={mapOpen} />}
        <div id='discription'>
          <BeforeHoverDiscription>
            <h2>2022.02.02</h2>
            <h3>대전 장동</h3>
          </BeforeHoverDiscription>
          <AfterHoverDiscription>
            <tbody>
              <tr>
                <th>걸음수</th>
                <td>3827</td>
              </tr>
              <tr>
                <th>속도</th>
                <td>
                  0.9<i>m/s</i>
                </td>
              </tr>
              <tr>
                <th>칼로리</th>
                <td>
                  0.9<i>kcal</i>
                </td>
              </tr>
              <tr>
                <th>시간</th>
                <td>
                  0<em>h</em>
                  47<em>m</em>
                </td>
              </tr>
            </tbody>
          </AfterHoverDiscription>
        </div>
        {isRight === false && <Map id={id} isOpen={mapOpen} />}
      </CardBox>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 184px;
  height: 252px;
  position: relative;
`;

const hoverIn = keyframes`
  from{
    z-index: 10; 
  }
  to{
    z-index: 0;
  }
`;

const CardBox = styled.div<{ isRight: boolean }>`
  position: relative;
  width: 184px;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bright_gray};
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  transition: all 0.5s;
  cursor: pointer;
  right: 0;
  justify-content: ${({ isRight }) => isRight && "flex-end"};
  > #discription {
    width: 184px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.5s;
  }
  :hover {
    z-index: 10;
    width: 392px;
    right: ${({ isRight }) => isRight && " 208px"};
    > #discription {
      height: 100%;
      width: 184px;
      transition: all 0.5s;
      > div {
        :first-child {
          display: none;
        }
        :last-child {
          display: flex;
        }
      }
    }
  }
  :not(:hover) {
    animation: ${hoverIn} 0.5s;
  }
`;

const BeforeHoverDiscription = styled.div`
  width: 184px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  > h2 {
    color: ${({ theme }) => theme.color.white};
    font-size: 18px;
    font-weight: 500;
  }
  > h3 {
    color: ${({ theme }) => theme.color.white};
    font-size: 14px;
    font-weight: 500;
  }
`;

const AfterHoverDiscription = styled.table`
  width: 184px;
  height: 100%;
  padding: 56px 24px;
  > tbody > tr {
    > th {
      font-size: 14px;
      color: ${({ theme }) => theme.color.white};
      text-align: start;
      padding-bottom: 21px;
      width: 100px;
    }
    > td {
      display: flex;
      font-size: 18px;
      color: ${({ theme }) => theme.color.white};
      padding-bottom: 21px;
      > i {
        font-style: normal;
        font-size: 14px;
        margin-left: 8px;
      }
      > em {
        font-size: 14px;
        font-style: normal;
        margin-right: 8px;
      }
    }
  }
`;

export default MeasurementCard;
