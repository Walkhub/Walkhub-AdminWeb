import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ExerciseList } from ".";
import Map from "./Map";
interface Props extends ExerciseList {
  isRight?: boolean;
}

const MeasurementCard: React.FC<Props> = ({
  isRight = false,
  calorie,
  certifying_shot,
  end_at,
  exercise_id,
  latitude,
  longitude,
  speed,
  time,
  walk_count,
}) => {
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const { kakao } = window;
    console.log(kakao);
    function getAddr(lat: number, lng: number) {
      kakao.maps.load(function () {
        let geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(latitude, longitude);
        let callback = function (result, status) {
          console.log(status);
          if (status === kakao.maps.services.Status.OK) {
            setAddress(
              `${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`
            );
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    }
    getAddr(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <CardContainer
      onMouseEnter={() => setMapOpen(true)}
      onMouseLeave={() => setMapOpen(false)}
    >
      <CardBox certifying_shot={certifying_shot} isRight={isRight}>
        {isRight && <Map id={exercise_id} isOpen={mapOpen} />}
        <div id='discription'>
          <BeforeHoverDiscription>
            <h2>{dayjs(end_at).format("YYYY-MM-DD")}</h2>
            <h3>{address}</h3>
          </BeforeHoverDiscription>
          <AfterHoverDiscription>
            <tbody>
              <tr>
                <th>걸음수</th>
                <td>{walk_count}</td>
              </tr>
              <tr>
                <th>속도</th>
                <td>
                  {Math.ceil(speed / 1) || 0}
                  <i>m/s</i>
                </td>
              </tr>
              <tr>
                <th>칼로리</th>
                <td>
                  {calorie}
                  <i>kcal</i>
                </td>
              </tr>
              <tr>
                <th>시간</th>
                <td>
                  {Math.ceil(time / 60)}
                  <em>h</em>
                  {time % 60}
                  <em>m</em>
                </td>
              </tr>
            </tbody>
          </AfterHoverDiscription>
        </div>
        {isRight === false && <Map id={exercise_id} isOpen={mapOpen} />}
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

const CardBox = styled.div<{ isRight: boolean; certifying_shot: string }>`
  position: relative;
  width: 184px;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bright_gray};
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  background-image: ${({ certifying_shot }) => `url(${certifying_shot})`};
  background-position: ${({ isRight }) => (isRight ? "right" : "left")};
  background-size: 184px 100%;
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
        :first-of-type {
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
