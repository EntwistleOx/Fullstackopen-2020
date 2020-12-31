import React from "react";
import { CoursePart } from "../types";

//{
//name: "Fundamentals",
//exerciseCount: 10,
//description: "This is an awesome course part",
//},
//{
//name: "Using props to pass data",
//exerciseCount: 7,
//groupProjectCount: 3,
//},
//{
//name: "Deeper type usage",
//exerciseCount: 14,
//description: "Confusing description",
//exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
//},
//{
//name: "A new interface",
//exerciseCount: 4,
//description: "This is the fouth part",
//},

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}{" "}
          {part.exerciseSubmissionLink}
        </p>
      );
    case "A new interface":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
