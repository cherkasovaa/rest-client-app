import type { RequestData } from '@/shared/types/request-data-firebase';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../../firebase';

export const requestService = {
  saveRequest: async (userId: string, requestData: RequestData) => {
    try {
      await addDoc(collection(db, 'users', userId, 'requests'), {
        ...requestData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to save data: ', error);
      throw error;
    }
  },

  getUserResponses: async (userId: string) => {
    try {
      const q = query(
        collection(db, 'users', userId, 'requests'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as RequestData
      );
    } catch (error) {
      console.error('Failed to get response from DB: ', error);
      return [];
    }
  },
};
