import firebase from 'firebase';

if (!firebase.apps.length) {
  const firebaseConfig = {
   apiKey: "AIzaSyDYyyWlZ57yzLvVAIXFp2_arMpkbWxRGo0",
    authDomain: "fir-sample-99744.firebaseapp.com",
    projectId: "fir-sample-99744",
    storageBucket: "fir-sample-99744.appspot.com",
    messagingSenderId: "929893000245",
    appId: "1:929893000245:web:903dce3881bf0cc03cbd7c"
  };
  
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};