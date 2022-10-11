import Button from "@mui/material/Button";
import React, { useState } from 'react';

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
			],
		},
        {
            questionText: "What's the mood of your trip?",
			answerOptions: [
				{ answerText: 'Happy'},
				{ answerText: 'Romantic'},
				{ answerText: 'Sad'},
				{ answerText: 'Angry'},
			],
        },
        {
            questionText: "What is your favorite color",
			answerOptions: [
				{ answerText: 'Red'},
				{ answerText: 'Orange'},
				{ answerText: 'Yellow'},
				{ answerText: 'Green'},
                { answerText: 'Blue'},
                { answerText: 'Purple'},
                { answerText: 'Cyan'},
                { answerText: 'Fuchsia'},
			],
        },
        {
            questionText: "Who is your favorite U.S. President in the last 50 years?",
            answerOptions: [
                { answerText: 'Joe Biden'},
                { answerText: 'Donald Trump'},
                { answerText: 'Barack Obama'},
                { answerText: 'George Bush'},
                { answerText: 'Bill Clinton'},
                { answerText: 'George Bush Sr.'},
                { answerText: 'Ronald Reagan'},
                { answerText: 'Jimmy Carter'},
                { answerText: 'Gerald Ford'},
                { answerText: 'Richard Nixon'},      
            ],
        }

	];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showEnd, setShowEnd] = useState(false);
    const [answers, setAnswers] = useState([]);

    const ansArr = ["hi"]


    const [flag, setFlag] = React.useState(true); // Change color of selected question
    const handleAnsClick = (answerOption) => { 
        setFlag(!flag);
        if (currentQuestion == questions.length - 1) {
            
            /*console.log(answerOption)
            ansArr = ansArr.concat(answerOption)
            console.log(ansArr)*/
            answers.push(answerOption)
            console.log(answers)
            
            setShowEnd(true);
        }
        else if (currentQuestion < questions.length - 1) {
            const nextQuestion = currentQuestion + 1;
            setCurrentQuestion(nextQuestion);

            answers.push(answerOption)
            console.log(answers)
            
            /*console.log(answerOption)
            ansArr = ansArr.concat(answerOption)
            console.log(ansArr)*/
        }
        
    };

    const handlePrevButtonClick = (answerOption) => { // Decrement question when Prev Button is pressed
        if (currentQuestion > 0) {
            answers.pop()
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

    return (
        <div className='app'>
        {showEnd ? (
            <div className='end-section'>
                <h1>quiz</h1>
                You have reached the end of the quiz

                <br></br>
                <Button variant="contained" sx={{ width: 200, padding: 2, margin: 2 }} onClick={() => handlePrevButtonClick()}> {"Start Over"}</Button>
                <Button variant="contained" sx={{ width: 200, padding: 2, margin: 2 }}> {"Submit Quiz"}</Button>
            </div>
        ) : (
                <>
                    <h1>quiz</h1>

                    <div className='question-text'>{questions[currentQuestion].questionText}</div>

                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <>
                            <Button variant="outlined" sx={{ width: 200, padding: 1, margin: 2 }} 
                                onClick={() => handleAnsClick(answerOption.answerText)}>
                            {answerOption.answerText}</Button>
                            <br></br>
                            </>
                        ))}
                    </div>
                    <Button variant="contained" sx={{ width: 100, padding: 1, margin: 1 }} onClick={() => handlePrevButtonClick()}> {"Prev"}</Button>
                </>
        	)}
        </div>
        
    );
}

export default Quiz;