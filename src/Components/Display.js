import React from "react"
import { decode } from 'html-entities';
import { nanoid } from "nanoid";



export default function Display(props) {

    const incorrectAnswersElements = props.choices.map(answer => {
        const wrongAnswerClassName = `
        ${props.selectedAnswer === answer ? "ans--btn--selected ans--btn" : "ans--btn"}
        ${(props.areAllAnswered && props.selectedAnswer === answer) && "ans--btn--incorrect ans--btn"}
		`;

		return <button
			key={nanoid()}
			className={wrongAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, answer)}
		>
			{ decode(answer) }
		</button>
	});

    const rightClassName = `
        ${props.selectedAnswer === props.correctAnswer ? "ans--btn--selected ans--btn" : "ans--btn"}
        ${props.areAllAnswered && "ans--btn--correct ans--btn"}
        `;

    const correctAnswerElement =
		<button 
            key={nanoid()}
            className={rightClassName}
            onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
        >
			{ decode(props.correctAnswer) }
		</button>

    incorrectAnswersElements.push(correctAnswerElement);

    const sortedAnswerElements = incorrectAnswersElements.sort((a, b) => (
        a.props.children.localeCompare(b.props.children))
    );

    return (
        <div className="dispQuiz">
            <h3>{ decode(props.question) }</h3>
            <div className="ans--btn--container">
                {sortedAnswerElements}
            </div>
            <br/>
            <br/>
            <hr className="hr-style"/>
        </div>
        
    )
}