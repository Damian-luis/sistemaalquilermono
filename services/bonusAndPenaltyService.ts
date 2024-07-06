import { db } from '../config/firebaseConfig';
import { IBonusAndPenalty } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, getDocs, updateDoc, doc, getDoc, deleteDoc,setDoc } from 'firebase/firestore';

export const addBonusOrPenalty = async (bp: IBonusAndPenalty): Promise<IBonusAndPenalty> => {
  try {
    const bpId = uuidv4();
    const newBP = { ...bp, id: bpId };
    await setDoc(doc(collection(db, 'BonusesAndPenalties'), bpId), newBP);
    return newBP;
  } catch (error) {
    console.error('Error adding bonus or penalty:', error);
    throw new Error('Error adding bonus or penalty');
  }
};

export const getBonusesAndPenalties = async (): Promise<IBonusAndPenalty[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'BonusesAndPenalties'));
    return querySnapshot.docs.map(doc => doc.data() as IBonusAndPenalty);
  } catch (error) {
    console.error('Error getting bonuses and penalties:', error);
    throw new Error('Error getting bonuses and penalties');
  }
};

export const updateBonusOrPenalty = async (bpId: string, updatedBP: Partial<IBonusAndPenalty>): Promise<void> => {
  try {
    await updateDoc(doc(collection(db, 'BonusesAndPenalties'), bpId), updatedBP);
  } catch (error) {
    console.error('Error updating bonus or penalty:', error);
    throw new Error('Error updating bonus or penalty');
  }
};

export const getBonusOrPenaltyById = async (bpId: string): Promise<IBonusAndPenalty | undefined> => {
  try {
    const docSnapshot = await getDoc(doc(collection(db, 'BonusesAndPenalties'), bpId));
    return docSnapshot.exists() ? (docSnapshot.data() as IBonusAndPenalty) : undefined;
  } catch (error) {
    console.error('Error getting bonus or penalty by id:', error);
    throw new Error('Error getting bonus or penalty by id');
  }
};

export const deleteBonusOrPenalty = async (bpId: string): Promise<void> => {
  try {
    await deleteDoc(doc(collection(db, 'BonusesAndPenalties'), bpId));
  } catch (error) {
    console.error('Error deleting bonus or penalty:', error);
    throw new Error('Error deleting bonus or penalty');
  }
};
