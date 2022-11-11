import { auth, firestore, db } from '../../../firebase';

async function checkSecurityQuestions(email, answer1, answer2) {
    db.collection("users").where("email", "==", email)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                var correctAnswer1 = data.securityQuestion1.toUpperCase();
                if (answer1.toUpperCase() != correctAnswer1) {
                    alert("Your favorite sport is incorrect.");
                    return false;
                }
                var correctAnswer2 = data.securityQuestion2.toUpperCase();
                if (answer2.toUpperCase() != correctAnswer2) {
                    alert("Your favorite color is incorrect.");
                    return false;
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting user: ", error);
        });

    return true;
    
}

export default checkSecurityQuestions;