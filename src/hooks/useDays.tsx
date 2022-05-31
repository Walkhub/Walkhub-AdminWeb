import { useState } from "react";
import dayjs from "dayjs";
type Days = Record<"startAt" | "endAt", dayjs.Dayjs>;

const useDays = () => {
  const [days, setDays] = useState<Days>({
    startAt: dayjs().subtract(6, "day"),
    endAt: dayjs(),
  });

  const addWeek = () => {
    setDays(state => ({
      endAt: state.endAt.add(7, "day"),
      startAt: state.endAt.add(1, "day"),
    }));
  };

  const subWeek = () => {
    setDays(state => ({
      endAt: state.startAt.subtract(1, "day"),
      startAt: state.startAt.subtract(7, "day"),
    }));
  };

  const resetWeekDays = () => {
    setDays({ startAt: dayjs().subtract(6, "day"), endAt: dayjs() });
  };

  const resetMonthDays = () => {
    setDays({
      startAt: dayjs().startOf("month"),
      endAt: dayjs().endOf("month"),
    });
  };

  const subMonth = () => {
    setDays(state => ({
      startAt: state.startAt.subtract(1, "month").startOf("month"),
      endAt: state.endAt.subtract(1, "month").endOf("month"),
    }));
  };

  const addMonth = () => {
    setDays(state => ({
      startAt: state.startAt.add(1, "month").startOf("month"),
      endAt: state.endAt.add(1, "month").endOf("month"),
    }));
  };

  return {
    days,
    addMonth,
    addWeek,
    subMonth,
    subWeek,
    resetMonthDays,
    resetWeekDays,
  };
};

export default useDays;
