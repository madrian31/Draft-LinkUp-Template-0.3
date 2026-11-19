import { collection, addDoc, getDocs, where, query, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { computeAge } from '../utils/age'

// Structure of a member input object
export interface MemberInput {
  firstName: string;
  lastName: string;
  middleName: string;
  civilStatus: string;
  email: string;
  address: string;
  gender: 'Male' | 'Female';
  phone: string;
  birthday: string;
}

// Add a new member to the Firestore database
export const addMember = ({ firstName, lastName, middleName, civilStatus, email, address, gender, phone, birthday }: MemberInput) =>
  addDoc(collection(db, "Members"), {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    middleName: middleName.trim(),
    civilStatus: civilStatus.trim(),
    email: email.trim(),
    address: address.trim(),
    gender,
    phone: phone.trim(),
    birthday,
    age: computeAge(birthday),
    createdAt: Timestamp.now(),
  });


// Check if a member already exists based on their first name, last name, and birthday
export const memberExist = async (firstName: string, lastName: string, birthday: string) => {
  const q = query(
    collection(db, "Members"),
    where("firstName", "==", firstName.trim()),
    where("lastName", "==", lastName.trim()),
    where("birthday", "==", birthday)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

// Fetch all members from the Firestore database
export async function getMembers() {
  const snapshot = await getDocs(collection(db, "Members"));
  const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return members;
}