// [3, 0, 2, 4.5, 0, 3, 1], 2

interface ExercisesValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerValues {
  dailyHours: Array<number>;
  target: number;
}

const parseArgumentsExer = (args: Array<string>): ExerValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const isNumber = args.slice(3).every((n) => !isNaN(Number(n)));

  if (!isNaN(Number(args[2])) && isNumber) {
    const dailyHours = args.slice(3).map((n) => Number(n));
    const target = Number(args[2]);
    return {
      dailyHours,
      target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): ExercisesValues => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d !== 0).length;
  const average = dailyHours.reduce((acc, cur) => acc + cur) / periodLength;
  let success = false;
  let rating = 1;
  let ratingDescription = "Dont be lazy and try harder next time.";
  const minPercent = (target * 60) / 100;

  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = "Great work!!";
  } else if (average >= minPercent && average < target) {
    success = false;
    rating = 2;
    ratingDescription = "Not bad, but could be better...";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseArgumentsExer(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(`Error, something goes wrong: `, error.message);
}
