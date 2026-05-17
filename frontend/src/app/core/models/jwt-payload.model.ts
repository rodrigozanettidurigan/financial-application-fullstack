export interface JwtPayload {
  sub?: string;
  exp?: number;
  authorities?: string[];
  scope?: string;
  [key: string]: unknown;
}
