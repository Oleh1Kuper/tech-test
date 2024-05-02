import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../db/firestore';
import { UserProfile } from '../types/user';
import { User } from '@auth0/auth0-react';

const useUserFromDB = (user?: User) => {
  const [userFromDB, setUserFromDB] = useState<UserProfile | null>(null);
  const [isLoad, setIsLoad] = useState(false);

  const fetchUser = async (email: string) => {
    setIsLoad(true);

    try {
      const q = query(
        collection(firestore, 'users'),
        where('email', '==', email),
      );
      const snapshot = await getDocs(q);

      const snapshotData = snapshot.docs.map((doc) => {
        return {
          ...(doc.data() as UserProfile),
          id: doc.id,
        };
      });

      setUserFromDB(snapshotData[0]);
    } catch (error) {
      throw error;
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUser(user.email);
    }
  }, [user]);

  return { userFromDB, isLoad };
};

export default useUserFromDB;
