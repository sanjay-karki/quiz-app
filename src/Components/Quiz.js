import React from "react"
import LoadingSpinner from "./LoadingSpinner"
import Display from "./Display"
import {nanoid} from "nanoid"

export default function Quiz(props) {

    const [allQuiz, setAllQuiz] = React.useState([])
    const [quizOver, setQuizOver] = React.useState(false)
    const [questionsArray, setQuestionsArray] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false);

    const allAnswered = questionsArray.every(question => question.selectedAnswer !== "")

    React.useEffect(() => {
        setIsLoading(true)
        fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
            .then(res => res.json())
            .then(data => {
                    setTimeout(() => {
                        setAllQuiz(data.results)
                        setIsLoading(false)
                    }, 700); 
                }
            )   
    
            
    }, [] )


    React.useEffect(() => {
        setQuestionsArray(allQuiz.map(question => {
            return {
                ...question, 
                id: nanoid(),
                selectedAnswer: "",
                areAllAnswered: false

            }
        }))
    }, [allQuiz])


    function handleSelectAnswer(questionId, answer) {
        if (!quizOver) {
            setQuestionsArray(prevArray => (prevArray.map(x => (
                questionId===x.id ? {...x, selectedAnswer: answer} : x
            ))))
        }
    }

    function checkAnswer() {
        if (allAnswered) {
            setQuizOver(true);
            setQuestionsArray(x => x.map(question => ({...question, areAllAnswered: true})));
        }
    }

    function resetQuiz() {
        setQuizOver(false);
        props.handleStartClick();
    }

    const quizQuestion = questionsArray.map(x => <Display 
                key={x.id}
                id={x.id}
                question={x.question}
                choices={x.incorrect_answers}
                correctAnswer={x.correct_answer}
                selectedAnswer={x.selectedAnswer}
                areAllAnswered={x.areAllAnswered}
                handleSelectAnswer={handleSelectAnswer}


    />)

    return (
        <>
        {isLoading ? <LoadingSpinner /> : 
        <main className="allquiz-main-container">
        <h1 className="app--title">Quiz App</h1>
        {quizQuestion}
        <div className="submit--container">
            <button className={`submit--btn ${allAnswered ? "submit--btn" : "submit--btn--disabled"}`} onClick={quizOver ? resetQuiz : checkAnswer }>
                {quizOver ? "Play Again" : "Check Answers"}    
            </button> 
        </div>         
        </main>
        }
        
        </>
    )
}