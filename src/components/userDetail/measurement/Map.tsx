import { useEffect, useState } from "react";

interface Props {
  id: number;
  isOpen: boolean;
}

const Map: React.FC<Props> = ({ id, isOpen }) => {
  useEffect(() => {
    const { kakao } = window;
    kakao.maps.load(function () {
      console.log(kakao);
      var container = document.getElementById(`map${id}`);
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      var map = new kakao.maps.Map(container, options);

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
