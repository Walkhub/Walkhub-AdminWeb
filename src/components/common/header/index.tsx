/* eslint-disable @next/next/link-passhref */
import styled from "@emotion/styled";
import { getToken, removeToken } from "@src/utils/function/tokenManager";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthCheck from "@src/hooks/useAuthCheck";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";
import ToastError from "@src/utils/function/errorMessage";

const Header = () => {
  const [sectionId, setSectionId] = useState<number>();
  const [errorCatch, setErrorCatch] = useState<boolean>();
  const { data, mutate } = useSWR("/teachers/my-class", fetcher);

  const router = useRouter();
  const { isAuth } = useAuthCheck(["TEACHER", "ROOT"]);

  useEffect(() => {
    try {
      const res = fetcher(`/teachers/my-class`);
      mutate(res, false);
      setSectionId(data.section.section_id);
      setErrorCatch(false);
    } catch (error) {
      setErrorCatch(true);
    }
  }, [data]);

  const myClassErrorHandle = () => {
    ToastError("ROOT 권한은 자신의 클래스가 없습니다.");
    router.push("/");
  };

  const logHandler = () => {
    removeToken();
    router.push("/login");
  };

  const ClassOrSchoolManagement = useMemo(() => {
    return (
      <>
        {isAuth ? (
          <>
            {errorCatch ? (
              <div onClick={myClassErrorHandle}>
                <Text style={{ gridColumn: "4 / 5" }}>클래스</Text>
              </div>
            ) : (
              <>
                <Link href={`/class/${sectionId}`}>
                  <Text style={{ gridColumn: "4 / 5" }}>클래스</Text>
                </Link>
              </>
            )}
          </>
        ) : (
          <Link href='/su'>
            <Text style={{ gridColumn: "4 / 5" }}>학교관리</Text>
          </Link>
        )}
      </>
    );
  }, [isAuth, sectionId]);

  return (
    <>
      <HeaderWrapper>
        <HeaderBox>
          <Link href='/'>
            <Text>WalkHub</Text>
          </Link>

          <Link href='/notice'>
            <Text style={{ gridColumn: "3 / 4" }}>공지</Text>
          </Link>

          {ClassOrSchoolManagement}

          <Link href='/challenge'>
            <Text style={{ gridColumn: "5 / 6" }}>챌린지</Text>
          </Link>

          <Text style={{ gridColumn: "7 / 8" }} onClick={logHandler}>
            {getToken().accessToken && getToken().refreshToken
              ? "로그아웃"
              : "로그인"}
          </Text>
        </HeaderBox>
      </HeaderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.light_gray};
`;

const HeaderBox = styled.div`
  width: 1220px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
`;

const Text = styled.div`
  font-size: 20px;
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  cursor: pointer;
  z-index: 99;
  position: relative;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};
  }
  ::before,
  ::after {
    content: "";
    border-bottom: solid 3px ${({ theme }) => theme.color.main};
    position: absolute;
    top: 60px;
    width: 0;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  ::before {
    left: 50px;
  }
  ::after {
    right: 50px;
  }
  &:hover::before,
  &:hover::after {
    width: 50px;
  }
`;
