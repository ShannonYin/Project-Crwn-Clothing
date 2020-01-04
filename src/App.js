import React from 'react';
import {Switch, Route,Link} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () =>{
	return (
		<div>
			<h1>HATS PAGE </h1>
		</div>
	);
};
const TopicsList = props =>{
	return (
		<div>
			<Link to={`${props.match.url}/13`}> TO TOPIC 13</Link>
			<h1>TOPIC LIST PAGE </h1>
		</div>
	);
};
const TopicDetail = props =>{
	return (
		<div>
			<h1>TOPIC DETAIL PAGE {props.match.params.topicId} </h1>
		</div>
	);
};

function App() {
  return (
    <div>
    	<Switch>
      		<Route exact path='/' component={HomePage} />
      		<Route exact path='/hats' component={TopicsList} />
      		<Route path='/topics/:topicId' component={TopicDetail} />
    	</Switch>
    </div>
  );
}

export default App;
