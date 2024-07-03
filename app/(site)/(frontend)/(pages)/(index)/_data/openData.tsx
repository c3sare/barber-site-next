type OpenDataType = {
  day: string;
  shortDay: string;
} & (
  | {
      open: true;
      start: string;
      end: string;
    }
  | {
      open: false;
    }
);

export const openData: OpenDataType[] = [
  {
    day: "Monday",
    shortDay: "MON",
    open: true,
    start: "09:00",
    end: "19:00",
  },
  {
    day: "Tuesday",
    shortDay: "TUE",
    open: true,
    start: "09:00",
    end: "19:00",
  },
  {
    day: "Wednesday",
    shortDay: "WED",
    open: true,
    start: "09:00",
    end: "19:00",
  },
  {
    day: "Thursday",
    shortDay: "THU",
    open: true,
    start: "09:00",
    end: "19:00",
  },
  {
    day: "Friday",
    shortDay: "FRI",
    open: true,
    start: "09:00",
    end: "19:00",
  },
  {
    day: "Sunday",
    shortDay: "SUN",
    open: false,
  },
  {
    day: "Saturday",
    shortDay: "SAT",
    open: false,
  },
];
