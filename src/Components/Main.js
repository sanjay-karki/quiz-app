import React from "react"
import Quiz from "./Quiz"

export default function Main() {

    const [isGameStart, setIsGameStart] = React.useState(false)

    function handleStartClick() {
        setIsGameStart(prevState => !prevState)
    }

    return (
        <>
        <main>
            {
                isGameStart ? 
                    <div className='quiz--container'>
                        <Quiz 
                            handleStartClick={handleStartClick}
                        />
                    </div> 
                
                : 
                    <div className="header--container">
                        <h1 className="app--title">Quiz App</h1>
                
                        <div className="inst--list--container">
                            <ul className="inst--ul">
                                <li className="inst--li">Each question in the quiz is of multiple-choice format.</li>
                                <li className="inst--li">Read each question carefully, and click on the answer you think is correct.</li>
                                <li className="inst--li">Click the <button className="rndm--inst--btn">Check Answers</button> button after you've finished answering all the questions.</li>
                            </ul>
                        </div>
                        
                        <div className="btn--container">
                            <button className="start--btn" onClick={handleStartClick}>Start</button>
                        </div>
                    </div>
            }

        </main>
        <footer>
        By <a href="https://www.linkedin.com/in/sanjay-karki9/" target="_blank" rel="noreferrer">Sanjay Karki</a>
        </footer>
        </>
        
        
    )
}