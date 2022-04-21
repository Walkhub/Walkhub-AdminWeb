import React, { FC, useState, useEffect } from "react";
import fetcher from "@src/utils/function/fetcher";
import useSWR, { mutate } from "swr";
import { StudentType } from "@src/utils/interfaces/student";
import StudentCard from "@src/components/home/cards/StudentCard";
import Link from "next/link";
import styled from "@emotion/styled";
import Dropdown from "@src/components/common/dropdown";
import { useRouter } from "next/router";

interface Props {
  setClassInfo: {
    grade: number;
    class_num: number;
  };
}

interface optionListType {
  value: string;
  optionName: string;
}

const sortList: optionListType[] = [
  {
    value: "NAME",
    optionName: "이름순",
  },
  {
    value: "DISTANCE",
    optionName: "거리순",
  },
  {
    value: "WALK_COUNT",
    optionName: "걸음순",
  },
  {
    value: "GCN",
    optionName: "학번순",
  },
];

const ClassStudentList: FC<Props> = ({ setClassInfo }) => {
  const [type, setType] = useState({
    sort: "NAME",
  });

  const { data } = useSWR(
    `/teachers/users/search?page=0&scope=STUDENT&sort=${type.sort}&grade=${setClassInfo.grade}&class=${setClassInfo.class_num}`,
    fetcher
  );

  const router = useRouter();
  const { id } = router.query;

  const changeType = (value: string | number, name: string | number) => {
    setType({
      ...type,
      [name]: value,
    });
  };

  const changeFilter = async () => {
    const { sort } = type;
    const updateData = await fetcher(
      `/teachers/users/search?sort=${sort}&grade=${setClassInfo.grade}&class=${setClassInfo.class_num}`
    );

    mutate(updateData, false);
  };

  useEffect(() => {
    changeFilter();
  }, [type]);

  return (
    <>
      <Title>
        <p>학생 확인</p>
        <Dropdown
          width={102}
          height={16}
          selectedValue={type.sort}
          name='sort'
          optionList={sortList}
          setSelectedValue={changeType}
          disabled={false}
          lineHeight={24}
          fontSize={16}
          fontWeight='normal'
          padding='10px 16px'
          isBoard={false}
        />
      </Title>
      <TypeMenuDiv>
        <p style={{ gridColumn: "4/5" }}>평균 걸음 수</p>
        <p>종합 걸음 수</p>
        <p>평균 거리</p>
        <p>종합 거리</p>
      </TypeMenuDiv>
      {data?.user_list?.map((i: StudentType) => {
        return (
          <Link
            href={`/class/${id}?userdetail`}
            as='/userdetail'
            passHref
            key={i.user_id}
          >
            <a>
              <StudentCard {...i} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;

  > p {
    font-size: 28px;
    font-style: normal;
    font-weight: medium;
    margin-right: 16px;
  }
`;

const TypeMenuDiv = styled.div`
  width: 1224px;
  padding: 16px 18px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(8, 1fr);
  place-items: center;
  > p {
    font-size: 16px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

export default ClassStudentList;
