import React from 'react';
import './App.css';
import Table from "./Table.js"
import Progress from "./Progress.js";

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state  = {page: "mainPage", data: []}
    }
  render() {
    let page = this.state.page
    if (page === "mainPage") {
        return (
            <div className="App">
                Выберете объем данных:
                <br/>
                <button onClick={()=>this.loadData(true)}>Большой объем данных</button>
                <button onClick={()=>this.loadData(false)}>Маленький объем данных</button>
            </div>
        );
    }
    if (page === "sTable") {
        return (
            <div className="App">
                <Table data = {this.state.data}/>
            </div>
        )
    }
    if (page === "turn") {
        return (
            <div className="App">
                Ожидайте загрузку данных
                    <Progress/>
            </div>
        )
    }
    if (page === "bTable") {
        return (
              <div className="App">
                  <Table data = {this.state.data}/>
              </div>
          )
      }
  }

  //@param (string, json)
changeState(state, data) {
        this.setState({page: state, data: data})
    console.log(this.state)
}

/* @param bool: true == big */
async loadData(isBig) {
        let bigData = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}' +
                      '&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}' +
                      '&description={lorem|32}';
        let simpData = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}' +
                       '&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

        if (isBig) {
            this.changeState("turn", [])
            let response = await fetch(bigData);
            let json = await response.json();
            await this.changeState("bTable", json)

        } else {
            let response = await fetch(simpData);
            let json = await response.json();
            this.changeState("sTable", json)
        }






}

}

export default App;
