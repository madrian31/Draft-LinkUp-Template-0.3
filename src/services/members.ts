import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  where,
  query,
  Timestamp,
} from 'firebase/firestore'

import { db } from '../firebase/firebase'
import { computeAge } from '../utils/age'

// Structure of a member input object
export interface MemberInput {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  email: string;
  address: string;
  gender: 'Male' | 'Female';
  phone: string;
  birthday: string;
  civilStatus: string;
}

// Fetch a single member by document ID
export async function getMemberById(id: string) {
  const snapshot = await getDoc(doc(db, "Members", id));

  if (!snapshot.exists()) {
    throw new Error("Member not found");
  }

  return { id: snapshot.id, ...snapshot.data() };
}

// Add a new member to the Firestore database
export const addMember = ({ firstName, lastName, middleName, suffix, email, address, gender, phone, birthday, civilStatus }: MemberInput) =>
  addDoc(collection(db, "Members"), {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    middleName: middleName.trim(),
    suffix: suffix.trim(),
    civilStatus: civilStatus.trim(),
    email: email.trim(),
    address: address.trim(),
    gender,
    phone: phone.trim(),
    birthday,
    age: computeAge(birthday),
    createdAt: Timestamp.now(),
  });

// Update an existing member
export const updateMember = async (id: string, { firstName, lastName, middleName, suffix, email, address, gender, phone, birthday, civilStatus }: MemberInput) => {
  updateDoc(doc(db, "Members", id), {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    middleName: middleName.trim(),
    suffix: suffix.trim(),
    civilStatus: civilStatus.trim(),
    email: email.trim(),
    address: address.trim(),
    gender,
    phone: phone.trim(),
    birthday,
    age: computeAge(birthday),
    updatedAt: Timestamp.now(),
  });
}

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