import React from 'react';
import random from '../utils/randomizer'

export class Random extends React.Component{

	render(){
		const content = random()
		return (
		<div>
			{content}
		</div>
		)}
}

export class RandomizeButton extends React.Component{
	render(){
		return(
			<button className="btn btn-primary" onClick={this.props.updateRandom}>
				Refresh Random
			</button>
		)
	}
}
