export interface JoiErr {
  name: string;
  details: {message: string}[];
  status?: number;
};
