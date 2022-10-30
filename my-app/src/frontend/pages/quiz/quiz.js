import Button from "@mui/material/Button";
import React, { useState } from 'react';
import QuizSend from "../../../backend/pages/quiz/quizSend";
import { auth, db } from "../../../firebase"
import {useNavigate } from 'react-router-dom';

function Quiz() {

    // Questions of the quiz
    // Find a way to make this more robust later :')
    const questions = [
		{
			questionText: 'What genre of music do you like?',
			answerOptions: [
				{ answerText: 'Pop'},
				{ answerText: 'Rap'},
				{ answerText: 'R&B'},
				{ answerText: 'Country'},
                { answerText: 'EDM'},
                { answerText: 'Hip Hop'},
                { answerText: 'Jazz'},
                { answerText: 'Classical'},
			],
		},
        {
            questionText: "What's the mood of your trip?",
			answerOptions: [
				{ answerText: 'Happy'},
				{ answerText: 'Romantic'},
				{ answerText: 'Sad'},
				{ answerText: 'Angry'},
                { answerText: 'Depressing'},
                { answerText: 'Energetic'},
			],
        },
        {
            questionText: "Who's your favorite artist?",
			answerOptions: [
				{ answerText: 'Taylor Swift'},
				{ answerText: 'Kanye West'},
				{ answerText: 'Lil Nas X'},
				{ answerText: 'Drake'},
                { answerText: 'Ariana Grande'},
                { answerText: 'Doja Cat'},
                { answerText: 'Nicki Minaj'},
                { answerText: 'BTS'},
                { answerText: 'Blackpink'},
			],
        },
        {
            questionText: "Who are you traveling with?",
            answerOptions: [
                { answerText: 'Family'},
                { answerText: 'Friends'},
                { answerText: 'Classmates'},
                { answerText: 'Colleagues'},
                { answerText: 'Lover'},
                { answerText: 'Enemy'},
            ],
        },
        {
            questionText: "What is the purpose of your trip?",
            answerOptions: [
                { answerText: 'Vacation'},
                { answerText: 'Road trip'},
                { answerText: 'Team bonding'},
                { answerText: 'Going home'},
                { answerText: 'Corporate retreat'},
                { answerText: 'Field trip'},
            ],
        }
	];

    const [currentQuestion, setCurrentQuestion] = useState(0); // keeps track of question number
    const [showEnd, setShowEnd] = useState(false); // Determines whether ending page is shown or not
    const [answers, setAnswers] = useState([]); // keeps track of user's answers
    const [flag, setFlag] = React.useState(true); // color change? flag = not selected, !flag = selected
    const navigate = useNavigate();
    const [selectedAns, setSelectedAns] = useState();

    /*for (var i = 0; i < questions.length; i++ ) {
        answers.push(null);
    }
    console.log(answers);*/

    const handleAnsClick = (answerOption) => { 

        answers[currentQuestion] = answerOption;
        //setFlag(!flag);
        /*if (answers.length == currentQuestion) { //nothing selected
            answers.push(answerOption)
        } else {
            //answers.pop()
            answers.push(answerOption) // pop last answer first and put new ans
        }*/
        console.log(answers);
    };

    const handlePrevButtonClick = (answerOption) => { // Decrement question when Prev Button is pressed
        if (currentQuestion > 0) {
            /*answers.pop()*/
            const prevQuestion = currentQuestion - 1;
            setCurrentQuestion(prevQuestion);
            if (showEnd) {
                while (answers.length > 0) { // remove all answers 
                    answers.pop()
                }
                setShowEnd(false)
                setCurrentQuestion(0)
            }
        }
    };

    const handleNextButtonClick = (answerOption) => { // Increment question when Next Button is pressed
        if (currentQuestion == questions.length - 1) {
            
            /*answers.push(answerOption)*/
            /*console.log(answers)*/
            
            setShowEnd(true);
        }
        else if (currentQuestion < questions.length - 1) {
            const nextQuestion = currentQuestion + 1;
            setCurrentQuestion(nextQuestion);

            /*answers.push(answerOption)*/
            /*console.log(answers)*/
            
        }
    };


    const handleSubmit = () => { // Send answers array as a string to database
        let ansString = "";
        for (let i = 0; i < answers.length; i++) {
            ansString += answers[i] + ",";
        }

        QuizSend(auth.currentUser.email, ansString)
        navigate("/results")
    };

    return (
        <div className='app'>
        {showEnd ? (
            <div className='end-section'>
                <h1>quiz</h1>
                You have reached the end of the quiz
                <br></br>
                <Button variant="contained" sx={{ width: 200, padding: 2, margin: 2 }} onClick={() => handlePrevButtonClick()}> {"Start Over"}</Button>
                <Button variant="contained" sx={{ width: 200, padding: 2, margin: 2 }} onClick={handleSubmit}> {"Submit Quiz"}</Button>
            </div>
        ) : (
                <>
                    <h1>quiz</h1>

                    <div className='question-text'>{questions[currentQuestion].questionText}</div>

                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <>
                            <Button variant="outlined" sx={{ width: 200, padding: 1, margin: 2 }} 
                                onClick={() => handleAnsClick(answerOption.answerText)}
                                color={answerOption.answerText === answers[currentQuestion] ? "success" : "primary"}>
                            {answerOption.answerText}</Button>
                            <br></br>
                            </>
                        ))}
                    </div>
                    <Button variant="contained" sx={{ width: 100, padding: 1, margin: 1 }} onClick={() => handlePrevButtonClick()}> {"Prev"}</Button>
                    <Button variant="contained" sx={{ width: 100, padding: 1, margin: 1 }} onClick={() => answers[currentQuestion] ? handleNextButtonClick() : alert("Please select an answer")}> {"Next"}</Button>
                </>
        	)}
        </div>
        
    );
}

export default Quiz;
