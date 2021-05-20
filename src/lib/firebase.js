import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDlnxfONKxqJWVUTD08QaLDncJgV-sc-EY",
    authDomain: "fir-sample-8d599.firebaseapp.com",
    projectId: "fir-sample-8d599",
    storageBucket: "fir-sample-8d599.appspot.com",
    messagingSenderId: "877692137874",
    appId: "1:877692137874:web:4d25ab4c4e85cd1733d14b"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getItemsFromFirebase = async () => {
    try{
        const model = await db
            .collection("todos")
            .get();
        const results = model.docs.map(
            (doc) => ({...doc.data(), id: doc.id})
        );
        return results;
    }catch (err) {
        console.log(err);
        return [];
    }
}

export const addItemIntoFirebase = async (item) => {
  try {
    const model = db.collection("todos");
    await model.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateItemInFirebase = async (item, id) => {
  try {
    const model = db.collection("todos").doc(id);
    await model.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearItemFromFirebase = async (item) => {
  const model = db.collection("todos").doc(item.id);
  await model.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};

