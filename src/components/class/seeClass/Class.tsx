import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ClassStudentList from "./ClassStudentList";
import DeleteBtn from "../../common/DeleteBtn";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";
import { useRouter } from "next/router";
import { deleteClass } from "@src/utils/apis/teachers";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";

type classInfo = {
  grade: number;
  class_num: number;
};

const ClassBanner = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [classInfo, setClassInfo] = useState<classInfo>({
    class_num: 0,
    grade: 0,
  });

  const router = useRouter();
  const { id } = router.query;

  const { data, mutate } = useSWR(`teachers/classes/${id}`, fetcher);

  useEffect(() => {
    try {
      const res = fetcher(`teachers/classes/${id}`);
      mutate(res, false);
      setClassInfo({
        class_num: data.class_num,
        grade: data.grade,
      });
    } catch (error) {}
  }, [data]);

  const classDelete = async (e: any) => {
    e.preventDefault();
    try {
      await deleteClass(id);
      mutate();
    } catch (error) {
      errorhandler(e);
    }
  };

  const errorhandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 401:
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 존재하지 않습니다.");
        case 404:
          return ToastError("삭제할 게시물을 찾지 못했습니다.");
        default:
          return ToastError("관리자에게 문의해주세요.");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  return (
    <Wrapper>
      {data && (
        <Banner>
          <DetailBtnDiv>
            <DetailBtn onClick={() => setModalStatus(true)}>
              {modalStatus && (
                <DeleteBtn
                  width={50}
                  onClick={classDelete}
                  setModalStatus={setModalStatus}
                  value='삭제'
                />
              )}
            </DetailBtn>
          </DetailBtnDiv>
          <BannerDiv1>
            <ClassName>
              {data.grade}학년 {data.class_num}반
            </ClassName>
            <ClassPeopleDiv>
              <p>소속인원</p>
              <p>{data.user_count}명</p>
            </ClassPeopleDiv>
          </BannerDiv1>
          <BannerDiv2>
            <TeacherDiv>
              <img src={data.teacher.profile_image_url} alt='' />
              <TeacherName>{data.teacher.name}</TeacherName>
              <p>선생님</p>
            </TeacherDiv>
            <ClassCodeDiv>
              <p>가입코드</p>
              <ClassCode>{data.class_code}</ClassCode>
            </ClassCodeDiv>
          </BannerDiv2>
        </Banner>
      )}
      <StudentListDiv>
        <ClassStudentList setClassInfo={classInfo} />
      </StudentListDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1224px;
  margin: 54px auto 48px;
`;

const Banner = styled.div`
  width: 100%;
  height: 268px;
  background: ${({ theme }) => theme.color.main};
  border-radius: 12px;
`;

const DetailBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DetailBtn = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 28px;
  margin-right: 20px;
  background: #ffffff;
`;

const BannerDiv1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 66px;
`;

const ClassName = styled.p`
  margin-left: 54px;
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.white};
`;

const ClassPeopleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  margin-top: 12px;
  > p {
    color: ${({ theme }) => theme.color.white};
    font-weight: nomal;
    text-align: right;
  }
`;

const BannerDiv2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
`;

const TeacherDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 54px;
  > p {
    color: ${({ theme }) => theme.color.white};
  }
  > img {
    width: 35px;
    height: 35px;
  }
`;

const TeacherName = styled.p`
  width: 60px;
  height: 30px;
  margin-right: 4px;
  font-size: 20px;
`;

const ClassCodeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  margin-top: 12px;
  > p {
    color: ${({ theme }) => theme.color.white};
    font-weight: nomal;
    text-align: right;
    font-size: 14px;
  }
`;

const ClassCode = styled.p`
  width: 64px;
  color: ${({ theme }) => theme.color.white};
  font-weight: medium;
  font-size: 16px;
`;

const StudentListDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default ClassBanner;
