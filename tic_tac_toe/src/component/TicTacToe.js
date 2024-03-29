import { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
     const [board, setBoard] = useState(Array(9).fill(''));
     const [move, setMove] = useState('X')

     const handleClick = (i) => {

        let square = [...board]

        if (board[i] !== '') {
            alert('Already Clicked')
            return
        }
    
        square[i] = move
        setBoard(square)
        if (move === 'X') {
            setMove('O')
        } else{
            setMove('X')
        }
    
        if (checkWin(square)) {
            alert("Winner")
            square.fill('');
            setBoard(square)
        }  
        if (checkDraw(square)) {
            alert("Match Draw")
            square.fill('');
            setBoard(square)
        }  

     }

     const checkDraw = (board) =>{
        let count=0;
        board.forEach(element => {
            if (element !=='') {
                count++;
            }
        });
    
        if (count >= 9) {
            return true;
        }else {
            return false;
        }
    }

    const checkWin = (board) => {
        const conditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        let flag = false;
        conditions.forEach(element => {
            if (board[element[0]] !=='' && board[element[1]] !=='' && board[element[2]] !=='') { 
            if (board[element[0]] === board[element[1]] && board[element[1]] === board[element[2]]) {
                flag = true;
            }
        }
        });
        return flag
    }

  return (
    <>
        <h1 className="text-center">Tic Tac Toe</h1>
        <table>
            <tr>
                <td onClick={() => {handleClick(0)}}>{board[0]}</td>
                <td onClick={() => {handleClick(1)}}>{board[1]}</td>
                <td onClick={() => {handleClick(2)}}>{board[2]}</td>
            </tr>
            <tr>
                <td onClick={() => {handleClick(3)}}>{board[3]}</td>
                <td onClick={() => {handleClick(4)}}>{board[4]}</td>
                <td onClick={() => {handleClick(5)}}>{board[5]}</td>
            </tr>
            <tr>
                <td onClick={() => {handleClick(6)}}>{board[6]}</td>
                <td onClick={() => {handleClick(7)}}>{board[7]}</td>
                <td onClick={() => {handleClick(8)}}>{board[8]}</td>
            </tr>
        </table>
    </>
  )
}

export default TicTacToe
