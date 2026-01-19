// event.js

export const leaderboardData = [
  {
    title: "President",
    candidates: [
      {
        rank: 1,
        name: "Juan Cruz",
        image:
          "https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif",
        votes: 30021,
        percentage: 42,
        color: "blue",
      },
      {
        rank: 2,
        name: "Maria Lopez",
        image:
          "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_2_nj4cvn.png",
        votes: 24091,
        percentage: 33,
        color: "cyan",
      },
      {
        rank: 3,
        name: "John Doe",
        image:
          "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_5_ggem1u.png",
        votes: 18000,
        percentage: 25,
        color: "green",
      },
    ],
  },
  {
    title: "Vice President",
    candidates: [
      {
        rank: 1,
        name: "Alice Smith",
        image:
          "https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787554/Ellipse_5_js8ouy.png",
        votes: 25000,
        percentage: 40,
        color: "blue",
      },
      {
        rank: 2,
        name: "Bob Lee",
        image:
          "https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_3_jpor6t.png",
        votes: 20000,
        percentage: 32,
        color: "cyan",
      },
      {
        rank: 3,
        name: "Charlie Tan",
        image:
          "https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_4_qy4p1c.png",
        votes: 15000,
        percentage: 28,
        color: "green",
      },
    ],
  },
  {
    title: "Secretary",
    candidates: [
      {
        rank: 1,
        name: "David Kim",
        image:
          "https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787554/Ellipse_5_js8ouy.png",
        votes: 18000,
        percentage: 45,
        color: "blue",
      },
      {
        rank: 2,
        name: "Emma Wong",
        image:
          "https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_3_jpor6t.png",
        votes: 14000,
        percentage: 35,
        color: "cyan",
      },
      {
        rank: 3,
        name: "Frank Lin",
        image:
          "https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_4_qy4p1c.png",
        votes: 10000,
        percentage: 20,
        color: "green",
      },
    ],
  },
];

export const position = [
  {
    title: "President",
  },
];

export const splitIntoColumns = (arr = [], size = 1) => {
  if (!Array.isArray(arr) || size <= 0) return [];

  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
