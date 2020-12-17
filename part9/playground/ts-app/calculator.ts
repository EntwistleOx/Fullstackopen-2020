type Operation = "multiply" | "add" | "divide";
type Result = string | number;

export const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) return "cant divide by 0";
      return a / b;
    default:
      throw new Error("Operation is not valid!");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Something went wrong, error message: ", error.message);
}
