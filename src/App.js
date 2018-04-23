import React, { Component } from "react";
import "./App.css";

class App extends Component {
constructor (props) {
  super(props);
  this.state = {
    isPowerOn: false,
    isHidden: true,
    displayNumber: "0"
  };

  this.checkPowerClick = this.checkPowerClick.bind(this);
  this.deleteAllClick = this.deleteAllClick.bind(this);
  this.deleteClick = this.deleteClick.bind(this);
  this.checkNumberClick = this.checkNumberClick.bind(this);
  this.checkEqualClick = this.checkEqualClick.bind(this);
}

checkPowerClick() {
  this.setState(prevState => ({
        isPowerOn: !prevState.isPowerOn,
        isHidden: !this.state.isHidden
  }));
};

deleteAllClick() {
  this.setState({
    displayNumber: "0"
  })
};

deleteClick() {
  this.setState({
    displayNumber: "0"
  })
}

checkNumberClick(number) {
  this.setState({
    displayNumber: number
  });
};

checkEqualClick() {

}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Calculator </h1>
        </header>
        <div className="calculator">
          <div className="screen">
            <Display displayNumber={this.state.displayNumber}/>
          </div>
          <div className="buttons">
            <PowerButton power={this.state.isPowerOn} onClick={this.checkPowerClick}/>
          </div>
          <div className="buttons">
            <ClearButton clear="AC" power={this.state.isPowerOn} onClick={this.deleteAllClick}/>
            <ClearButton clear="CE" power={this.state.isPowerOn} onClick={this.deleteClick}/>
            <OperButton operator="+" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="-" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
          </div>
          <div className="buttons">
            <NumButton number="7" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="8" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="9" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="*" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
          </div>
          <div className="buttons">
            <NumButton number="4" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="5" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="6" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="/" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
          </div>
          <div className="buttons">
            <NumButton number="1" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="2" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="3" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="%" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
          </div>
          <div className="buttons">
            <NumButton number="0" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="." power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <EqualButton power={this.state.isPowerOn} onClick={this.checkEqualClick}/>
          </div>
        </div>
      </div>
    );
  };
};

class PowerButton extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked(e) {
		e.preventDefault();
		this.props.onClick(this.props.power);
	}

  render() {
    return ( <button type="button" className="power" onClick={this.clicked}> {this.props.power ? "Turn Off" : "Turn On"} </button> );
  }
}

class Display extends Component {
  render() {
    return ( <div>{this.props.displayNumber}</div> );
  }
};

class NumButton extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  clicked(e) {
		e.preventDefault();
		this.props.onClick(this.props.number);
	}
  render() {
    return ( <button type="button" disabled={!this.props.power} onClick={this.clicked}> {this.props.number} </button> );
  }
};

class OperButton extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  clicked(e) {
    e.preventDefault();
    this.props.onClick(this.props.operator)
  }
  render() {
    return <button type="button" disabled={!this.props.power} onClick={this.clicked}> {this.props.operator} </button>;
  }
};

class ClearButton extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  clicked(e) {
    e.preventDefault();
    this.props.onClick(this.props.clear)
  }
  render() {
    return <button type="button" disabled={!this.props.power} onClick={this.clicked}> {this.props.clear} </button>;
  }
}

class EqualButton extends React.Component {
	constructor(props) {
		super(props);
		this.clicked = this.clicked.bind(this);
	}

	clicked(e){
		e.preventDefault();
		this.props.onClick();
	}

	render() {
		return (
			<button type="button" className="equal" onClick={this.clicked}>=</button>
		);
	}
};

export default App;