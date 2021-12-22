import { useEffect, useState } from "react"
import "./tictactoe.css"
import imgx from "../images/x.png"
import imgo from "../images/o.png"
import imgt from "../images/t.jpg"
import audioa from "../audio/a.mp3"



const Tictactoe = () => {

    const [turn, setTurn] = useState("X")
    const [value, setValue] = useState(Array(9).fill(""));
    const [win, setWin] = useState(null);
    const [count, setCount] = useState(0);




    useEffect(() => {
        winner()
        if (count === 9) {
            setWin("No one")
        }
    }, [count, win])

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

    }

    const handleClick = (n) => {


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
        setCount(count + 1)

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

    return (

        <div>


            {
                win === null ?
                    <>


                        <audio controls autoplay>
                            <source src={audioa} type="audio/ogg" />
                        </audio>
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
        </div>
    )
}

export { Tictactoe }