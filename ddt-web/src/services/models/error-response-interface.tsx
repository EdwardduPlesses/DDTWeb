export interface _ErrorResponse {
  errors: { [key: string]: string[] };
  status: number;
  title: string;
}
