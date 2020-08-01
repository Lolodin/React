import React from "react";
import './addrow.css'
export default class AddRow extends React.Component{
    constructor(props) {
        super(props)
        this.state = {id: "", firstName:"",email:"", lastName:"", phone: "", buttonActive: false}
    }

    render() {
        return(
            <tr>
                <td>0</td>
                <td><input type={"number"} onChange={(event)=>this.changeState(event,"id")} value={this.state.id}/></td>
                <td><input onChange={(event)=>this.changeState(event,"firstName")} value={this.state.firstName}/></td>
                <td><input onChange={(event)=>this.changeState(event,"lastName")} value={this.state.lastName}/></td>
                <td><input type={"email"} onChange={(event)=>this.changeState(event,"email")} value={this.state.email}/></td>
                <td><input type={"tel"} onChange={(event)=>this.changeState(event,"phone")} value={this.state.phone}/></td>
                {this.state.buttonActive ? <td><button onClick={()=> this.props.addRow(this.state)}>Добавить в таблицу</button></td> : null}
            </tr>
        )
    }

    changeState(e,state) {
        this.checkFullstate()
        switch (state) {
            case "id"       : this.setState({id: e.target.value });
                break;
            case "firstName": this.setState({firstName: e.target.value });
                break;
            case "lastName" : this.setState({lastName: e.target.value });
                break;
            case "email"    : this.setState({email: e.target.value });
                break;
            case "phone"    : this.setState({phone: e.target.value });
                break;
        }


    }
    checkFullstate() {
        if (this.state.id === "") {
            return;
        }
        if (this.state.firstName === "") {
            return;
        }
        if (this.state.lastName === "") {
            return;
        }
        if (this.state.email === "") {
            return;
        }
        if (this.state.phone === "") {
            return;
        }
        this.setState({buttonActive: true});

    }
}