import React from 'react';
import GameSquare from './GameSquare';
import '../../css/TicTacToe.css';

export default class TicTacToe extends React.Component{
    constructor(props){
        super(props);
        this.state = this.initialState;

        document.querySelector('body').classList.add('background-red');
    }

    get initialState(){
        return {
            currentPlayer: 'X',
            squares: Array(9).fill(null),
            winner: null,
            winningLine: null,
            gameOver: false,
        };
    }

    handleClick(i){
        if(this.state.winner !== null){ return; }

        let squares = this.state.squares;
        squares[i] = this.state.currentPlayer;
        this.setState({ squares: squares });

        this.checkForWinner();
    }

    checkForWinner(){
        let lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        /* Check if a line has matching values */
        for(let i = 0; i < lines.length; i++){
            let [a, b, c] = lines[i];
            if(
                this.state.squares[a] !== null && 
                this.state.squares[a] === this.state.squares[b] && 
                this.state.squares[a] === this.state.squares[c]
            ){
                this.setState(prevState => {
                    winner: prevState.currentPlayer,
                    winningLine: i+1,
                    gameOver: true
                });
                return;
            }
        }

        /* Check if all squares are filled */
        let hasEmptySquares = false;
        for(let i = 0; i < this.state.squares.length; i++){
            if(this.state.squares[i] === null){
                hasEmptySquares = true;
            }
        }
        if(!hasEmptySquares){
             this.setState({ gameOver: true });
        }

        /* Change Turns */
        this.setState(prevState => { currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X' });
        if(this.state.currentPlayer === 'X'){
            document.querySelector('body').classList.remove('background-red');
            document.querySelector('body').classList.add('background-blue');
        }else{
            document.querySelector('body').classList.remove('background-blue');
            document.querySelector('body').classList.add('background-red');
        }
    }

    getBoardClasses(){
        let classes = ['game-board', 'player-'+this.state.currentPlayer.toLowerCase()+'-turn'];
        if(this.state.gameOver){
            classes.push('game-over');
        }
        return classes.join(' ');
    }

    getGridClasses(){
        let classes = ['grid'];
        if(this.state.winningLine !== null){
            classes.push('has-winning-line winning-line-'+this.state.winningLine);
        }
        return classes.join(' ');
    }

    resetGame(){
        this.setState(this.initialState);
        document.querySelector('body').classList.remove('background-blue');
        document.querySelector('body').classList.add('background-red');
    }

    render(){
        /* Render game status message */
        let message = '';
        if(this.state.gameOver === false){
            message = `It's Player ${this.state.currentPlayer}'s Turn.`;
        }else if(this.state.winner !== null){
            message = `Player ${this.state.currentPlayer} Wins!`;
        }else{
            message = `It's a Draw!`;
        }

        return(
            <div className={this.getBoardClasses()}>
                <strong>{message}</strong>
                <div className={this.getGridClasses()}>
                    {this.state.squares.map((el, i) => 
                        <GameSquare onClick={() => this.handleClick(i)} 
                                    value={this.state.squares[i]} 
                                    disabled={this.state.squares[i] !== null || this.state.winner !== null} />
                    )}
                </div>
                <button className="btn btn-white" 
                        onClick={() => this.resetGame()}
                        disabled={!this.state.gameOver}>
                    New Game
                </button>
            </div>
        );
    }
}