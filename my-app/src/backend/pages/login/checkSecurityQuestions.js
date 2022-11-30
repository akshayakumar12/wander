import { db } from '../../../firebase';

var returnval = "";

function checkSecurityQuestions(email, answer1, answer2) {
    db.collection("users").where("email", "==", email)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                var correctAnswer1 = data.securityQuestion1.toUpperCase();
                var correctAnswer2 = data.securityQuestion2.toUpperCase();

                if (answer1.toUpperCase() != correctAnswer1) {
                    returnval = "false";
                    alert("Your favorite sport is incorrect.");
                } else if (answer2.toUpperCase() != correctAnswer2) {
                    returnval = "false";
                    alert("Your favorite color is incorrect.");
                } else if (answer1.toUpperCase() == correctAnswer1) {
                    if (answer2.toUpperCase() == correctAnswer2) {
                        returnval = "true";
                    }
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting user: ", error);
        });

    return returnval;

}

export default checkSecurityQuestions;