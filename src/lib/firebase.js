import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD5cBtnhUSVD7U7UN_hw5T---yZXaznPkQ",
    authDomain: "fir-sample2-c12cf.firebaseapp.com",
    projectId: "fir-sample2-c12cf",
    storageBucket: "fir-sample2-c12cf.appspot.com",
    messagingSenderId: "926458286200",
    appId: "1:926458286200:web:1aef958e0cab7475dddd8d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

// login with auth
export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await db.collection("users").doc(uid).set({ name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
}

export const updateUser = async (user, image) => {
  try {
    const userDoc = await firebase.firestore().collection("users").doc(user.id).get();
    if (userDoc.exists) {
      await firebase.firestore().collection("users").doc(user.id).update({ ...userDoc.data(), image: image });
    }
  } catch (err) {
    console.log(err);
  }
} 

//upload 
export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let downloadUrl = "";
  try {
    await ref.put(image);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
}; 

//add, put, deltet item
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

