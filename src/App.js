import React, { Component } from "react";
import "./App.css";
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isPowerOn: false,
      isHidden: true,
      displayNumber: "0",
      operator: "",
      lastButton: "",
      results: []
    };

    this.checkPowerClick = this.checkPowerClick.bind(this);
    this.deleteAllClick = this.deleteAllClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.checkNumberClick = this.checkNumberClick.bind(this);
    this.checkOperClick = this.checkOperClick.bind(this);
    this.checkEqualClick = this.checkEqualClick.bind(this);
    this.storeResult = this.storeResult.bind(this);
  }

  checkPowerClick() {
    if (this.state.isPowerOn === true) {
      this.setState({
        displayNumber: "0"
      })
    }
    this.setState(prevState => ({
          isPowerOn: !prevState.isPowerOn,
          isHidden: !this.state.isHidden,
          lastButton: "power",
          results: []
    }));
  };

  deleteAllClick() {
    this.setState({
      displayNumber: "0",
      lastButton: "deleteAll"
    })
  };

  deleteClick() {
    this.setState({
      displayNumber: "0",
      lastButton: "delete"
    })
  };

  checkNumberClick(number) {

  let displayNumber = this.state.displayNumber;
  let lastButton = this.state.lastButton;

    if (displayNumber === "0" || lastButton === "equal") {
      let nonZero = displayNumber = "";
      let newNumber = nonZero + number.toString();
      this.setState({
        displayNumber: newNumber,
        lastButton: "number"
      });
    }
    else if (displayNumber !== "0") {
      this.setState({
        displayNumber: displayNumber + number,
        lastButton: "number"
      })

    };
  };

  checkOperClick (operator) {
    this.setState({
      operator: operator,
      displayNumber: this.state.displayNumber + operator,
      lastButton: "operator"
    })
  };

  checkEqualClick() {
    if (this.state.operator === "%") {
      var displayStr = this.state.displayNumber;
      var displayLength = displayStr.length;
      var displayNum = displayStr.slice(0, displayLength-1);
      var result = parseInt(displayNum) / 100;

      console.log(displayStr);
      console.log(displayLength);
      console.log(displayNum);
      this.setState({
        displayNumber: result.toString(),
        lastButton: "equal"
      })
    } else {
      this.setState({
        displayNumber: eval(this.state.displayNumber),
        lastButton: "equal"
      });

      if (this.state.lastButton !== "equal") {
        this.storeResult();
      }
    }
  };
  
  storeResult() {
    this.setState(prevState => ({
      results: [...prevState.results, eval(this.state.displayNumber)]
    }))
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title"></h1>
        </header> */}
        <div>
          <History results={this.state.results} power={this.state.isPowerOn} />
        </div>
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
            <OperButton operator="+" power={this.state.isPowerOn} onClick={this.checkOperClick}/>
            <OperButton operator="-" power={this.state.isPowerOn} onClick={this.checkOperClick}/>
          </div>
          <div className="buttons">
            <NumButton number="7" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="8" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="9" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="*" power={this.state.isPowerOn} onClick={this.checkOperClick}/>
          </div>
          <div className="buttons">
            <NumButton number="4" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="5" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="6" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="/" power={this.state.isPowerOn} onClick={this.checkOperClick}/>
          </div>
          <div className="buttons">
            <NumButton number="1" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="2" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <NumButton number="3" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="%" power={this.state.isPowerOn} onClick={this.checkOperClick}/>
          </div>
          <div className="buttons">
            <NumButton number="0" power={this.state.isPowerOn} onClick={this.checkNumberClick}/>
            <OperButton operator="." power={this.state.isPowerOn} onClick={this.checkOperClick}/>
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
	};
  render() {
    let bgColor = this.props.power ? "red" : "green";
    return ( <button type="button" className="power" onClick={this.clicked} style={{backgroundColor: bgColor}}> {this.props.power ? "Off" : "On"} </button> );
  }
};

class History extends Component {
  render() {
    //return ( <div>{this.props.results}</div> );
    if(this.props.power !== true) {
      return ( <div className="history"><h3>History of Results</h3>{this.props.results}</div> );
    } else {
      return ( <div className="history">
                  <h3>History of Results</h3>
                  {this.props.results.map((result) => {
                      return <div key={uuidv1()}>{result}</div>;
                    })}
             </div> );
    }
  }
};

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
    return ( <button type="button" className={this.props.power ? "on" : "button"} disabled={!this.props.power} onClick={this.clicked}> {this.props.number} </button> );
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
    return ( <button type="button" className={this.props.power ? "on" : "button"} disabled={!this.props.power} onClick={this.clicked}> {this.props.operator} </button> );
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
    return ( <button type="button" className={this.props.power ? "on" : "button"} disabled={!this.props.power} onClick={this.clicked}> {this.props.clear} </button> );
  }
};

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
		return ( <button type="button" className="equal" onClick={this.clicked}>=</button> );
	}
};

export default App;
