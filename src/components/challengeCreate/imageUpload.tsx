import React, { ChangeEvent, useMemo } from "react";
import styled from "@emotion/styled";
import InputHeader from "@src/components/challengeCreate/inputHeader";

interface PropsType {
  value: File | null;
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<PropsType> = ({ onChangeInputValue, value }) => {
  const imageName = useMemo(() => {
    if (value)
      return <strong className='imgName selectedImg'>{value.name}</strong>;
    return <p className='imgName isEmpty'>선택된 파일 없음</p>;
  }, [value]);
  return (
    <Wrapper>
      <InputHeader disabled={false}>챌린지 대표 사진</InputHeader>
      <ImgInfos>
        <FileChooseBox>
          <input type='file' name='image_url' onChange={onChangeInputValue} />
          <p className='choosefile'>사진 선택</p>
        </FileChooseBox>
        {imageName}
      </ImgInfos>
    </Wrapper>
  );
};

export default ImageUpload;

const Wrapper = styled.section`
  margin-top: 24px;
`;
const ImgInfos = styled.div`
  display: flex;
  align-items: flex-end;
  > .imgName {
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
    font-weight: normal;
    margin-left: 16px;
    width: 282px;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  > .selectedImg {
    color: ${({ theme }) => theme.color.black};
  }
  > .isEmpty {
    color: ${({ theme }) => theme.color.normal_gray};
  }
`;
const FileChooseBox = styled.label`
  > input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  > .choosefile {
    border: 1px solid ${({ theme }) => theme.color.normal_gray};
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 10px;
    font-size: 16px;
    line-height: 24px;
    width: 94px;
    height: 48px;
    cursor: pointer;
    padding: 12px 16px;
    color: ${({ theme }) => theme.color.normal_gray};
    font-weight: normal;
    font-style: normal;
    :hover {
      color: ${({ theme }) => theme.color.main};
      border: 1px solid ${({ theme }) => theme.color.main};
    }
  }
`;
