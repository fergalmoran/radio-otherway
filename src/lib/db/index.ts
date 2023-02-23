import serviceAccount from "serviceAccount.json";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
  WithFieldValue,
  QueryDocumentSnapshot, SnapshotOptions, Timestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtk_Ym-AZroXsHvQVcdHXYyc_TvgycAWw",
  authDomain: "radio-otherway.firebaseapp.com",
  projectId: "radio-otherway",
  storageBucket: "radio-otherway.appspot.com",
  messagingSenderId: "47147490249",
  appId: "1:47147490249:web:a84515b3ce1c481826e618",
  measurementId: "G-12YB78EZM4"
};
export const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore();
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
const showConverter = {
  toFirestore(show: WithFieldValue<Show>): DocumentData {
    return {
      ...show,
      date: Timestamp.fromDate(<Date>show.date)
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Show {
    const data = snapshot.data(options)!;
    return new Show(
      snapshot.id,
      data.title,
      data.date.toDate(),
      data.creator);
  }
};

// Import all your model types
import { Show, Reminder, RemindersProcessed } from "@/models";
// export all your collections

export const shows = createCollection<Show>("shows")
  .withConverter(showConverter);
export const reminders = createCollection<Reminder>("reminders");
export const remindersProcessed = createCollection<RemindersProcessed>("reminders");
export default firestore;
