import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../state/State.tsx";
import { Typography } from "@mui/material";

type Stopwatch = { m: number; s: number };
const differenceInMinutesAndSeconds = (
  dateLeft: Date,
  dateRight: Date,
): Stopwatch => {
  const ds = differenceInSeconds(dateLeft, dateRight);
  return { m: Math.floor(ds / 60), s: ds % 60 };
};

const getStopwatchColor = ({ m }: Stopwatch) => {
  if (m >= 5) return "error.main";
  if (m >= 2) return "warning.main";
  return "success.main";
};

export const Stopwatch = () => {
  const { turnInfo } = useGlobalState();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [difference, setDifference] = useState<Stopwatch>({ m: 0, s: 0 });

  useEffect(() => {
    let i: NodeJS.Timeout | undefined;
    i = setInterval(() => {
      setDifference(differenceInMinutesAndSeconds(new Date(), startDate));
    }, 250);
    return () => {
      if (i) clearInterval(i);
      i = undefined;
    };
  }, [startDate]);

  useEffect(() => {
    setStartDate(new Date());
  }, [turnInfo?.currentChar]);

  return (
    <Typography component="span" mr={2} color={getStopwatchColor(difference)}>
      {difference.m.toString().padStart(2, "0")}:
      {difference.s.toString().padStart(2, "0")}
    </Typography>
  );
};
