import { getAuth } from "firebase/auth";
import { doc, setDoc, collection, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig"; // Zakładam, że masz zdefiniowane FIRESTORE_DB w swoim projekcie

export const saveParagon = async (userIp: string, history: any, type:string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(history)
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const date = new Date().toISOString().split("T")[0];

  try {
    const conversationRef = doc(collection(FIRESTORE_DB, type), user.uid);
    const docSnap = await getDoc(conversationRef);

    if (docSnap.exists()) {
      const currentRecipes = docSnap.data()[date] || [];
      const updatedMissions = [...currentRecipes, history];

      await updateDoc(conversationRef, { [date]: updatedMissions });
    } else {
      await setDoc(conversationRef, { [date]: [history] });
    }
  } catch (error) {
    console.error("Błąd podczas zapisywania dokumentu: ", error);
    throw error;
  }
};



interface ParagonsData {
  [date: string]: any[]; // Możesz dokładniej określić typ zamiast `any`, jeśli wiesz, jakie dane będą przechowywane
}

export const getParagons = async (): Promise<ParagonsData | null> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    const conversationRef = doc(collection(FIRESTORE_DB, "recipes"), user.uid);
    const docSnap = await getDoc(conversationRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as ParagonsData;
      return data;
    } else {
      console.log(`Dokument nie istnieje.`);
      return null;
    }
  } catch (error) {
    console.error("Błąd podczas pobierania dokumentu: ", error);
    throw error;
  }
};

// export const getParagons = async (
//   date: string,
//   userIp: string
// ): Promise<any[] | null> => {
//   const receiptsRef = doc(collection(FIRESTORE_DB, "recipes"), date);
//   const docSnapshot = await getDoc(receiptsRef);

//   if (docSnapshot.exists()) {
//     const receiptsData = docSnapshot.data();
//     const userData = receiptsData[userIp];
//     return userData;
//   } else {
//     return null;
//   }
// };
