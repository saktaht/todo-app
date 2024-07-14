import { AddTaskProps } from "../@types/add";

const isTodo = (arg: any): arg is AddTaskProps => {
  return (
    typeof arg === 'object' &&
    Object.keys(arg).length === 4 &&
    typeof arg.id === 'string' &&
    typeof arg.value === 'string' &&
    typeof arg.checked === 'boolean' &&
    typeof arg.remove === 'boolean'
  );
};

export const isTodos = (arg: any): arg is AddTaskProps[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};