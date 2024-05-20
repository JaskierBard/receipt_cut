import { getAuth } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig"; // Zakładam, że masz zdefiniowane FIRESTORE_DB w swoim projekcie

export const saveParagon = async (userIp: string, history: any) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const date = new Date().toISOString().split("T")[0];
  const conversationRef = doc(collection(FIRESTORE_DB, "recipes"), date);
  
  try {
    await setDoc(
      conversationRef,
      {
        [userIp]: [{ history: history }],
      },
      { merge: true }
    );
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
};
