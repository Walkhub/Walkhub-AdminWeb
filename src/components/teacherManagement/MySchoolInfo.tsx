import styled from "@emotion/styled";
import React, { ChangeEvent, useState } from "react";
import { changeSchoolLogo } from "@src/utils/apis/school";
import ToastSuccess from "@src/utils/function/successMessage";
import ToastError from "@src/utils/function/errorMessage";
import { createImage } from "@src/utils/apis/default";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";

const MySchoolInfo = () => {
  const [schoolLogo, setSchoolLogo] = useState<string[]>([]);
  const { data } = useSWR("/ranks/schools", fetcher);

  const onInfoChangeEnd = () => {
    if (schoolLogo.length === 0) {
      ToastError("사진을 선택해주세요");
    } else {
      changeSchoolLogo(schoolLogo)
        .then(() => ToastSuccess("성공했습니다."))
        .catch(() => ToastError("예상치 못한 오류가 발생했습니다."));
    }
  };

  const changeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      formData.append("images", e.target.files[0]);

      await createImage(formData).then(res => {
        setSchoolLogo(res.data.image_url);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SchoolInfoBox>
        <input type='file' onChange={changeLogo} id='file' accept='image/*' />
        <label htmlFor='file'>
          <img
            alt=''
            src={schoolLogo[0] ? schoolLogo[0] : data.logo_image_url}
          />
        </label>
        <div>
          <p>{data.name}</p>
          <span onClick={onInfoChangeEnd}>수정하기</span>
        </div>
      </SchoolInfoBox>
    </>
  );
};

export default MySchoolInfo;

const SchoolInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  img {
    width: 80px;
    height: 80px;
    margin-right: 24px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
  }
  p {
    font-size: 20px;
    font-weight: bold;
  }
  a {
    color: ${({ theme }) => theme.color.main};
  }
  input {
    display: none;
  }
  span {
    cursor: pointer;
  }
`;
