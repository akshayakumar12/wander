import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function quiz() {

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
	];

    return (
        <>
        <h1>quiz</h1>

        <div className='question-text'>{questions[0].questionText}</div>

        <div className='answer-section'>
	        {questions[0].answerOptions.map((answerOption, index) => (
		        <>
                <Button variant="outlined" sx={{ width: 200, padding: 1, margin: 2 }}>{answerOption.answerText}</Button>
                <br></br>
                </>
	        ))}
        </div>
        </>
        
    );
}

export default quiz;