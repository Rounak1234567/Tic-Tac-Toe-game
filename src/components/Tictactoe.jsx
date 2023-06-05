import { useEffect, useRef, useState } from "react"
import "./tictactoe.css"
import imgx from "../images/x.png"
import imgo from "../images/o.png"
import imgt from "../images/t.jpg"
import audio1 from "../audio/audio1.wav"
import audio2 from "../audio/audio2.wav"



const Tictactoe = () => {

    const [turn, setTurn] = useState("X")
    const [value, setValue] = useState(Array(9).fill(""));
    const [win, setWin] = useState(null);
    const [count, setCount] = useState(0);
    const [w,setW] = useState(0)
    const history = useRef([])
    const [h,setH] = useState(0)



    useEffect(() => {
        winner();
        history.current = [...history.current, value]
        //setH(h=>h+1)
    },[w])


    useEffect(() => {
        if (count === 9) {
            setWin("No one")
        }
    }, [count]);


    const winner = () => {

        let obj = {
            horizontal: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            vertical: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        for (let key in obj) {
            obj[key].forEach((p) => {
                if (
                    value[p[0]] === "" ||
                    value[p[1]] === "" ||
                    value[p[2]] === ""
                ) {

                } else if (
                    value[p[0]] === value[p[1]] &&
                    value[p[1]] === value[p[2]]
                ) {
                    setWin(value[p[0]])

                }
            })
        }

    }

    const playAgain = () => {
        setValue(Array(9).fill(""))
        setTurn("X")
        setCount(0)
        setWin(null)
        history.current=[Array(9).fill("")];
    }

    const handleClick = (n) => {
        
        setW(w+1)
        if (value[n] !== "") {
            alert("Already Clicked");
            return;
        }

        let square = [...value]
        if (turn === "X") {
            square[n] = "X";
            setTurn("O")
        }
        else {
            square[n] = "O";
            setTurn("X")
        }

        setValue(square)
        setH(history.current.length)
        setCount(count + 1)

        let audiox = document.getElementById("audiox");
        let audioo = document.getElementById("audioo");
        if(turn==="X") audiox.play();
        else audioo.play()

    }


    const Cell = ({ n }) => {
        return (
            <td className="cell" onClick={() => {

                handleClick(n)

            }} >{value[n] === "X" ? <img style={{ width: "60%" }} src={imgx} alt="none" /> :
                value[n] === "O" ? <img style={{ width: "60%" }} src={imgo} alt="none" /> :
                    <p></p>
                }</td>
        )
    }


    const handleBack = ()=>{

        if(count<=0){
            alert("This is where you started, you can't go any further back.");
            setTurn("X")
            return;
        }

        else{
            if (turn === "X") {
                setTurn("O")
            }
            else {
                setTurn("X")
            }
            let square = [...history.current[h-1]];
            let k = 0;
            for(let i = 0; i < square.length; i++){
                if(square[i] !== ""){
                    k++;
                }
            }
            setValue(square);    
            setH(h-1)
            setCount(k)
            console.log(history.current[h-1],h)
        }

        
    }


    const handleNext = ()=>{
        if(h+1 >= history.current.length){
            alert("Sorry Time travel is not allowed, you are already at the last move")
            return;
        }

        else{
            if (turn === "X") {
                setTurn("O")
            }
            else {
                setTurn("X")
            }
            let square = [...history.current[h+1]];
            let k = 0;
            for(let i = 0; i < square.length; i++){
                if(square[i] !== ""){
                    k++;
                }
            }
            setValue(square);    
            setH(h+1)
            setCount(k)
            console.log(history.current[h+1],h)
        }
    }

    return (
        <div>
            {
                win === null ?
                    <>
                        <h1 style={{ color: "white" }}>!!Play The Game!!</h1>
                        <h2 style={{ color: "white" }}>Turn of : {turn}</h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <Cell n={0} />
                                    <Cell n={1} />
                                    <Cell n={2} />
                                </tr>
                                <tr>
                                    <Cell n={3} />
                                    <Cell n={4} />
                                    <Cell n={5} />
                                </tr>
                                <tr>
                                    <Cell n={6} />
                                    <Cell n={7} />
                                    <Cell n={8} />
                                </tr>
                            </tbody>
                        </table>
                        <br /><br />
                        <button className="undo-redo-btn" onClick={handleBack}>↶</button>
                        <button className="undo-redo-btn" onClick={handleNext}>↷</button>
                    </>
                    : win === "No one" ?
                        <>
                            <div>
                                <h1 style={{ color: "white" }}>!Its a Tie!</h1>
                                <img src={imgt} alt="none" />
                                <h3 className="reset">Click on the restart button to play again</h3>
                                <button className="reset-btn" onClick={() => {
                                    playAgain()
                                }} > Restart </button>
                            </div>
                        </> :
                        <div className="result">
                            <h1 className="winner">{win} is the winner</h1>
                            <h3 className="reset">Click on the restart button to play again</h3>
                            <button className="reset-btn" onClick={() => {
                                playAgain()
                            }} > Restart </button>
                        </div>
            }
            <audio controls id="audiox">
                <source src={audio1}/>
            </audio>
            <audio controls id="audioo">
                <source src={audio2}/>
            </audio>
        </div>
    )
}


export { Tictactoe }