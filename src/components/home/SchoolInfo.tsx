import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import React from "react";
import useSWR from "swr";

const SchoolInfo = () => {
  const { data } = useSWR("/ranks/schools", fetcher);

  return (
    <>
      <SchoolInfoBox>
        <img src={data.logo_image_url} />
        <p>{data.name}</p>
      </SchoolInfoBox>
    </>
  );
};

export default SchoolInfo;

const SchoolInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;
