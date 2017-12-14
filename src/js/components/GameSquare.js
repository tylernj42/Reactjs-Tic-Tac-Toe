import React from 'react';
import '../../css/GameSquare.css';

export default class GameSquare extends React.Component{
    render(){
        return (
            <div className="game-square">
                <button className={this.props.value === null ? "empty" : ""} onClick={this.props.onClick} disabled={this.props.disabled}>
                    {this.props.value}
                </button>
            </div>
        );
    }
}