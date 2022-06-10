import fetcher from "@src/utils/function/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

interface Props {
  id: number;
  isOpen: boolean;
}

interface ExerciseList {
  exercise_list: {
    sequence: number;
    latitude: number;
    longitude: number;
  }[];
}

const Map: React.FC<Props> = ({ id, isOpen }) => {
  const { data } = useSWR<ExerciseList>(`/exercises/${id}`, fetcher);
  useEffect(() => {
    const { kakao } = window;
    kakao.maps.load(function () {
      let container = document.getElementById(`map${id}`);
      let options = {
        center: new kakao.maps.LatLng(
          data?.exercise_list[0].latitude,
          data?.exercise_list[0].longitude - 0.001
        ),
        level: 3,
      };
      let map = new kakao.maps.Map(container, options);

      let linePath = data?.exercise_list.map(i => {
        return new kakao.maps.LatLng(i.latitude, i.longitude);
      });

      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#4D99F0",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });

      polyline.setMap(map);

      if (isOpen)
        setTimeout(() => {
          map.relayout();
        }, 500);
    });
  }, [isOpen]);

  return (
    <div
      id={`map${id}`}
      style={{
        width: "208px",
        height: "252px",
      }}
    ></div>
  );
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default Map;
