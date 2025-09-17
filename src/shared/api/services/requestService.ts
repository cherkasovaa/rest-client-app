import { db } from '@/shared/config/firebase';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

export const requestService = {
  saveRequest: async (userId: string, requestData: RequestData) => {
    try {
      await addDoc(collection(db, 'users', userId, 'requests'), {
        ...requestData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  },

  getResponse: async (userId: string, requestId: string) => {
    try {
      const docRef = doc(db, 'users', userId, 'requests', requestId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as RequestData;
      }

      return null;
    } catch (error) {
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
      throw error;
    }
  },
};
