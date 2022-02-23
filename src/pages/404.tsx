import styled from "@emotion/styled";
import DefaultBtn from "@src/components/common/defaultBtn/DefaultBtn";
import Header from "@src/components/common/header";
import { useRouter } from "next/dist/client/router";
import React from "react";

const PageNotFound = () => {
  const router = useRouter();

  const homeHandler = () => {
    router.push("/");
  };

  return (
    <>
      <Header />
      <BackgroundBox>
        <FourZeroFour>404</FourZeroFour>
        <TitleEng>Page not found</TitleEng>
        <TitleKor>찾을 수 없는 페이지입니다.</TitleKor>
        <Description>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </Description>
        <DefaultBtn width={184} onClick={homeHandler}>
          홈으로 이동
        </DefaultBtn>
      </BackgroundBox>
    </>
  );
};

export default PageNotFound;

const BackgroundBox = styled.div`
  width: 1220px;
  margin: 0 auto;
  margin-top: 140px;
`;

const FourZeroFour = styled.p`
  font-size: 85px;
  color: ${({ theme }) => theme.color.main};
  font-weight: bold;
`;

const TitleEng = styled.p`
  font-size: 40px;
  color: ${({ theme }) => theme.color.main};
  margin-bottom: 15px;
`;

const TitleKor = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.color.dark_gray};
`;

const Description = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.color.dark_gray};
  margin: 50px 0px;
`;
