export interface ApiResponseInterface {
  request: string;
  timestamp: number;
  user: {
    id: number;
    email: string;
  } | null;
  response: any;
}
