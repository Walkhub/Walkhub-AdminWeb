import React, { useState, useEffect } from "react";
import Class from "@src/components/class/seeClass/Class";
import withAuth from "@src/hocs/withAuth";
import { DetailClassType } from "@src/utils/interfaces/class";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";
import { getClass } from "@src/utils/apis/teachers";
import { useRouter } from "next/router";

const SeeClassPage = () => {
  const [classDetail, setClassDetail] = useState<DetailClassType>();

  const router = useRouter();
  const { id } = router.query;
  const section_id = Number(id);

  useEffect(() => {
    console.log(id);
    console.log(classDetail);
    const asd = async () => {
      try {
        const response = getClass(section_id);
        console.log(response);
        //setClassDetail(response.data)
      } catch (e) {
        console.log(e);
      }
    };
    asd();
  }, []);

  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 401:
          ToastError("로그인 상태를 다시 확인해 주세요.");
          break;
        case 403:
          ToastError("권한이 없습니다.");
          break;
        case 404:
          router.push("/");
          break;
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  return (
    <>
      {classDetail && (
        <Class
          class_code={classDetail.class_code}
          grade={classDetail.grade}
          class_num={classDetail.class_num}
          teacher={classDetail.teacher}
        />
      )}
    </>
  );
};

export default withAuth(SeeClassPage, ["ROOT", "SU", "TEACHER"]);
