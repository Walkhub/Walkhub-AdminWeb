import { ChallengeContentType } from "@src/utils/interfaces/challenge";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type CalendarType = "start_at" | "end_at" | "";
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

interface PropsType {
  setChallengeContent: Dispatch<SetStateAction<ChallengeContentType>>;
  challengeContent: ChallengeContentType;
}

const useCalendar = ({ setChallengeContent, challengeContent }: PropsType) => {
  const [selectedCalnedar, setSelectedCalnedar] = useState<CalendarType>("");
  const [selectedDay, setSelectedDay] = useState<{
    start_at: Date;
    end_at: Date;
  }>({
    start_at: new Date(),
    end_at: new Date(),
  });
  const onChangeDate = useCallback(
    (value: Date) => {
      const dateToString = new Date(
        value.getTime() + value.getTimezoneOffset() + 1000 + KR_TIME_DIFF
      )
        .toISOString()
        .substring(0, 10);
      if (selectedCalnedar === "start_at") {
        setSelectedDay({
          ...selectedDay,
          start_at: value,
        });
        setChallengeContent({
          ...challengeContent,
          start_at: dateToString,
        });
      } else {
        setSelectedDay({
          ...selectedDay,
          end_at: value,
        });
        setChallengeContent({
          ...challengeContent,
          end_at: dateToString,
        });
      }
    },
    [selectedCalnedar, setChallengeContent, setSelectedCalnedar]
  );
  return {
    selectedCalnedar,
    selectedDay,
    setSelectedCalnedar,
    setSelectedDay,
    onChangeDate,
  };
};
export default useCalendar;
