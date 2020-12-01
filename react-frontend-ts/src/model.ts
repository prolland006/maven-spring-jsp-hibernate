export enum FeedbackType {
  UNDEFINED = -1,
  USER_ALREADY_EXIST = 0,
  USER_CREATED_SUCCESSFULLY = 1,
  CONSTRAINT_VIOLATION = 2,
  ERROR = 3,
}

export type FeedbackMessage = {
  id: number;
  message: string;  
}