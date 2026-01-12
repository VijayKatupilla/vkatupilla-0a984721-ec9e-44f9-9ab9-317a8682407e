export interface JwtUser {
  sub: number;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'VIEWER';
  organizationId: number;
}
