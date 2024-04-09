
const firebaseConfig = {
  apiKey: "AIzaSyDOy7TFNyC5qZqUe8b82mldfP2ckxksELc",
  authDomain: "disco-skyline-385509.firebaseapp.com",
  databaseURL: "https://disco-skyline-385509-default-rtdb.firebaseio.com",
  projectId: "disco-skyline-385509",
  storageBucket: "disco-skyline-385509.appspot.com",
  messagingSenderId: "460845498402",
  appId: "1:460845498402:web:67044db90063a14c904a7b"
};

firebase.initializeApp(firebaseConfig);

// Get references to authentication and Firestore services
const auth = firebase.auth();
const db = firebase.firestore();

// Signup form submit handler
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const name = document.getElementById('signupName').value;
  const photo = document.getElementById('signupPhoto').files[0];

  try {
    // Create user with email and password
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Upload photo to Firebase Storage
    const storageRef = firebase.storage().ref('user_photos/' + user.uid);
    const photoRef = storageRef.child(photo.name);
    const snapshot = await photoRef.put(photo);
    const downloadURL = await snapshot.ref.getDownloadURL();

    // Update user's profile with name and photo URL
    await user.updateProfile({
      displayName: name,
      photoURL: downloadURL
    });

    // Store additional user data in Firestore
    await db.collection("users").doc(user.uid).set({
      displayName: name,
      photoURL: downloadURL,
      email: email
    });


    alert("signup")
    // Redirect to dashboard
    // window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error.message);
    // Handle signup error
  }
});

// Login form submit handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    // Sign in user with email and password
    await auth.signInWithEmailAndPassword(email, password);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error.message);
    // Handle login error
  }
});

// ----------------password reset -----------------------------------------

// async function forgetPass(e) {
//   e.preventDefault();
//   const email = document.querySelector("loginEmail")


//   // firebase.auth().sendPasswordResetEmail(email)
//   //   .then(() => {
//   //     alert('Reset link send');
//   //     console.log("OKKK");
//   //     // Password reset email sent!
//   //     // ..
//   //   })
//   //   .catch((error) => {
//   //     var errorCode = error.code;
//   //     var errorMessage = error.message;
//   //     // ..
//   //   });

//   try {
//     const result = await firebase.auth().sendPasswordResetEmail(email)
//     console.log(result)
//     alert("email sent  successfully")
//   } catch (err) {
//     console.log(err)
//     alert(err.message);
//   }

// }

async function forgetPass(e) {
  e.preventDefault();
  const email = document.querySelector("#loginEmail").value;

  try {
    const result = await firebase.auth().sendPasswordResetEmail(email);
    console.log(result);
    alert("Email sent successfully");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}





