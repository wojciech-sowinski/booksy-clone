// services duration in min

export const services = [
  {
    name: "Baleyage/Ombre/Sombre+ strzyżenie+modelowanie",
    duration: 150,
    price: 250,
  },
  { name: "Prostowanie keratynowe", duration: 245, price: 250 },
  { name: "Modelowanie włosów", duration: 40, price: 50 },
  { name: "Strzyżenie męskie", duration: 40, price: 40 },
  {
    name: "Regeneracja/Nawilżenie wlosa/modelowanie",
    duration: 120,
    price: 140,
  },
];

export const daysOfWeekWorkTime = [
  {
    name: "monday",
    workHours: [
      { start: { h: 8, m: 30 }, end: { h: 14, m: 30 } },
      { start: { h: 18, m: 30 }, end: { h: 21, m: 30 } },
    ],
  },
  {
    name: "tuesday",
    workHours: [{ start: { h: 8, m: 0 }, end: { h: 19, m: 30 } }],
  },
  {
    name: "wednesday",
    workHours: [{ start: { h: 0, m: 1 }, end: { h: 23, m: 59 } }],
  },
  {
    name: "thursday",
    workHours: [{ start: { h: 8, m: 0 }, end: { h: 19, m: 30 } }],
  },
  {
    name: "friday",
    workHours: [{ start: { h: 8, m: 0 }, end: { h: 19, m: 30 } }],
  },
  {
    name: "saturday",
    workHours: [
      { start: { h: 7, m: 0 }, end: { h: 11, m: 30 } },
      { start: { h: 16, m: 0 }, end: { h: 21, m: 30 } },
    ],
  },
  {
    name: "sunday",
    workHours: [],
  },
];
