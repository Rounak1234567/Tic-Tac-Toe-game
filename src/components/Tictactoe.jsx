import { useEffect, useState } from "react"

const Tictactoe = ()=>{

    const [turn, setTurn] = useState("x")
    const [value, setValue] = useState(Array(9).fill(""));
    const [win, setWin] = useState();
    const [count, setCount] = useState(0);

    useEffect(()=>{
        winner()
        if(count === 9){
            setWin("No one")
        }
    },[count])

    const winner = ()=>{

        let obj = {
            horizontal: [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ],
            vertical: [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagonal: [
                [0,4,8],
                [2,4,6]
            ]
        }

        for( let key in obj){
            obj[key].forEach((p)=>{
                if(
                    value[p[0]] === "" ||
                    value[p[1]] === "" ||
                    value[p[2]] === "" 
                ){

                }else if(
                    value[p[0]] === value[p[1]] &&
                    value[p[1]] === value[p[2]]
                ){
                    setWin(value[p[0]])
                }
            })
        }

    }

    const handleClick = (n)=>{
        if(value[n]!==""){
            alert("Already Clicked");
            return;
        }
        
        let square = [...value]
        if(turn === "x"){
            square[n] = "x";
            setTurn("o")
        }
        else{
            square[n] = "o";
            setTurn("x")
        }
        
        setValue(square)
        setCount(count+1)
        
    }
    

    const Cell = ({n})=>{
        return(
            <td className="cell" onClick={()=>{
                
                handleClick(n)
                
            }} >{value[n]}</td>
        )
    }

    return(
        <div>
            <h1>!!Play The Game!!</h1>
            <h2>Turn of : {turn}</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <Cell n = {0}/>
                        <Cell n = {1}/>
                        <Cell n = {2}/>
                    </tr>
                    <tr>
                        <Cell n = {3}/>
                        <Cell n = {4}/>
                        <Cell n = {5}/>
                    </tr>
                    <tr>
                        <Cell n = {6}/>
                        <Cell n = {7}/>
                        <Cell n = {8}/>
                    </tr>
                </tbody>
            </table>
            {
                win && (
                    <div>
                        <p>{win} is the winner</p>
                    </div>
                )
            }
        </div>
    )
}

export {Tictactoe}