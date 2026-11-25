import type {Timestamp} from 'firebase/firestore';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  suffix?: string;
  email: string;
  address: string;
  gender?: 'Male' | 'Female';
  phone?: string;
  birthday?: string;
  age?: number;
  civilStatus?: string;
  createdAt: Timestamp;
}

export type NewMember = Omit<Member, 'createdAt'>;
export type MemberForm = Pick<Member, 'firstName' | 'lastName' | 'middleName' | 'suffix' | 'email' | 'address' | 'gender' | 'phone' | 'birthday' | 'age' | 'civilStatus'>;