import type {Timestamp} from 'firebase/firestore';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  civilStatus?: string;
  email: string;
  address: string;
  gender?: 'Male' | 'Female';
  phone?: string;
  birthday?: string;
  age?: number;
  createdAt: Timestamp;
}

export type NewMember = Omit<Member, 'createdAt'>;
export type MemberForm = Pick<Member, 'firstName' | 'lastName' | 'middleName' | 'civilStatus' | 'email' | 'address' | 'gender' | 'phone' | 'birthday' | 'age'>;