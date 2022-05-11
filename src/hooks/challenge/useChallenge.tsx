import { PageType } from "@src/pages/challenge/create";
import {
  changeChallenge,
  createChallenge,
  getChallengeDetails,
} from "@src/utils/apis/challenges";
import { createImage } from "@src/utils/apis/default";
import ToastError from "@src/utils/function/errorMessage";
import fetcher from "@src/utils/function/fetcher";
import { getAuthority } from "@src/utils/function/localstorgeAuthority";
import { AuthorityType } from "@src/utils/interfaces/auth";
import { ChallengeContentType } from "@src/utils/interfaces/challenge";
import axios from "axios";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";

interface PropsType {
  pageType: PageType;
  id?: string;
  setSelectedDay: Dispatch<
    SetStateAction<{
      start_at: Date;
      end_at: Date;
    }>
  >;
  selectedDay: {
    start_at: Date;
    end_at: Date;
  };
  setChallengeContent: Dispatch<SetStateAction<ChallengeContentType>>;
  challengeContent: ChallengeContentType;
}

const useChallengeContent = ({
  pageType,
  id,
  setSelectedDay,
  selectedDay,
  setChallengeContent,
  challengeContent,
}: PropsType) => {
  const [user, setUser] = useState<{
    type: AuthorityType | null;
    grade: number | null;
    class_num: number | null;
    school_name: string;
  }>({
    type: null,
    grade: null,
    class_num: null,
    school_name: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const { start_at, end_at } = challengeContent;
  const { data } = useSWR<{
    name: string;
    profile_image_url: string;
    grade: number | null;
    class_num: number | null;
    school_name: string;
  }>(`/users/info`, fetcher);
  const router = useRouter();
  const errorHandler = useCallback(
    (e: unknown) => {
      if (axios.isAxiosError(e) && e.response) {
        switch (e.response.status) {
          case 400:
            ToastError("모든 빈칸을 채워주세요.");
            break;
          case 401:
            ToastError("로그인 상태를 다시 확인해 주세요.");
            break;
          case 403:
            ToastError("챌린지를 생성 할 수 있는 권한이 없습니다.");
            router.push("/login/certification");
            break;
          case 404:
            ToastError("존재하지 않는 챌린지입니다.");
            break;
          case 500:
            return ToastError("관리자에게 문의해주세요");
        }
      } else {
        ToastError("네트워크 연결을 확인해주세요.");
      }
    },
    [axios.isAxiosError]
  );
  useEffect(() => {
    const authority = getAuthority();
    data &&
      authority &&
      setUser({
        ...user,
        type: authority,
        grade: data.grade,
        class_num: data.class_num,
        school_name: data.school_name,
      });
  }, [data]);
  useEffect(() => {
    if (user.type === "TEACHER") onChangeDropdownValue("CLASS", "user_scope");
    else if (user.type === "SU") onChangeDropdownValue("ALL", "user_scope");
  }, [user]);
  const onChangeInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
        return;
      }
      if (e.target.name == "goal" || e.target.name === "success_standard") {
        setChallengeContent({
          ...challengeContent,
          [e.target.name]: Number(e.target.value),
        });
        return;
      }
      setChallengeContent({
        ...challengeContent,
        [e.target.name]: e.target.value,
      });
    },
    [challengeContent]
  );
  const onChangeDropdownValue = useCallback(
    (value: string | number, name: string | number) => {
      setChallengeContent({
        ...challengeContent,
        [name]: value,
      });
    },
    [challengeContent, setChallengeContent]
  );

  useEffect(() => {
    if (challengeContent.goal_scope === "ALL") {
      setChallengeContent({
        ...challengeContent,
        success_standard: 1,
      });
    }
  }, [challengeContent.goal_scope]);
  const onClickSubmit = useCallback(async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        const image = await createImage(formData).then(res => {
          return res.data.image_url[0];
        });
        await judgeRequestAPI(image);
        return;
      }
      judgeRequestAPI("");
    } catch (err) {
      errorHandler(err);
    }
  }, [challengeContent, file]);
  const judgeRequestAPI = (img: string) => {
    if (pageType === "create") {
      createChallenge({
        ...challengeContent,
        image_url: img,
        start_at,
        end_at,
      })
        .then(res => router.push(`/challenge/${res.challenge_id}`))
        .catch(err => errorHandler(err));
    } else {
      if (id)
        changeChallenge({
          ...challengeContent,
          start_at,
          end_at,
          challenge_id: Number(id),
        }).then(res => router.push(`/challenge/${res.challenge_id}`));
    }
  };

  useEffect(() => {
    if (id)
      pageType === "modify" &&
        getChallengeDetails(Number(id)).then(res => {
          setChallengeContent(res);
          setSelectedDay({
            ...selectedDay,
            start_at: new Date(res.start_at),
            end_at: new Date(res.end_at),
          });
        });
  }, [pageType]);

  return {
    onChangeInputValue,
    onChangeDropdownValue,
    user,
    setUser,
    file,
    setFile,
    onClickSubmit,
  };
};

export default useChallengeContent;
