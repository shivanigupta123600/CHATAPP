// Initialize Firebase
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

// Get reference to authentication service
const auth = firebase.auth();
const db = firebase.firestore();

// Check authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const userId = user.uid;

        // Get user data from Firestore
        db.collection("users").doc(userId).get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                displayUserInfo(userData);
            } else {
                console.error("No such document!");
            }
        }).catch((error) => {
            console.error("Error getting document:", error);
        });
    } else {
        // User is signed out
        console.log("User is signed out");
        // Redirect to login page
        window.location.href = "new.html";
    }
});

// Function to display user information in the dashboard
function displayUserInfo(userData) {
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');

    userName.textContent = userData.displayName;
    userPhoto.src = userData.photoURL;
}

// function logout() {
//     firebase.auth().signOut().then(() => {
//         // console.log("sign out successgully");
//         alert("signout successfully ");
//         window.location.href = "new.html"

//     }).catch((error) => {
//         console.log(err.message)
//     });

// }