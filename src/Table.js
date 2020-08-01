import React from 'react';
import './table.css';
import _ from 'lodash';
import UserCard from "./UserCard.js";
import AddRow from "./AddRow.js";
export default class  Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], sortMethod: "asc", elementSort: "", showUserId: "not", find: "", pages: 1, currentPage: 1, add: false};
        this.addRow = this.addRow.bind(this);
    }

    render() {
      let page = [];
      for (let i = 1; i<=this.state.pages; i++) {
        page.push(i);
        }
      let method;
      if (this.state.sortMethod === 'asc') {
        method = 'desc';
        } else {
        method = 'asc';
        }
    return (
            <div className={"mytable"}>
                <div className={"find"}>
                <input value={this.state.find} onChange={(e)=>this.changeFindInput(e)} />
                <button onClick={()=>this.filterUsers()} >Найти</button>
                    {!this.state.add  ? <button className={"add"} onClick={()=> this.state.add ? this.setState({add: false}) : this.setState({add: true})}>Добавить</button> : null}
                </div>

                <table>
                <thead>
                <tr> <th>№</th>
                    <th  onClick={()=>this.sortCol("id", method)}>id {this.state.elementSort === "id" && this.state.sortMethod === 'desc' ? "▼" : "▲" } </th>
                    <th  onClick={()=>this.sortCol("firstName", method)}>first_name {this.state.elementSort === "firstName" && this.state.sortMethod === 'desc' ? "▼" : "▲" }</th>
                    <th  onClick={()=>this.sortCol("lastName", method)}>last_name {this.state.elementSort === "lastName" && this.state.sortMethod === 'desc' ? "▼" : "▲" }</th>
                    <th  onClick={()=>this.sortCol("email", method)}>email {this.state.elementSort === "email" && this.state.sortMethod === 'desc' ? "▼" : "▲" }</th>
                    <th  onClick={()=>this.sortCol("phone", method)}>phone {this.state.elementSort === "phone" && this.state.sortMethod === 'desc' ? "▼" : "▲" }</th>
                </tr>
                </thead>
                    <tbody>
                    {this.state.add ? <AddRow addRow={this.addRow}/> : null}
                    {this.state.data.map((item, index) =>(
                        <tr onClick={()=>this.showUserCard(index) } key={item.id + item.phone}>
                            <td>{(index+1) + (this.state.currentPage >1 ? 50*(this.state.currentPage-1):0)}</td>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
                {page.map((item) =>(
                    <p className={"pagination"} onClick={()=> this.changePage(item)}>{item}</p>
                ))}
                {this.state.showUserId !== "not" ? <UserCard person = {this.state.data[this.state.showUserId] }/>: null }
            </div>
        )

    }
    componentDidMount(){
      let len = this.props.data.length /50;
      len = Math.ceil(len);
      let sl = this.props.data;
        if (len>1) {
          sl = this.props.data.slice(0, 50);
        }
    this.setState({data: sl, pages: len});
    }

    changePage(numberPage) {
      let lastPage = numberPage * 50;
      let firsPage = lastPage-50;
      let sl = this.props.data.slice(firsPage, lastPage);
      this.setState({data: sl, currentPage: numberPage});

}

    //  ("id", "desc" string)
    sortCol(tableHead, method) {
      let stateArray = this.state.data.concat();
      stateArray = _.orderBy(stateArray, tableHead, method);
      this.setState({data: stateArray, sortMethod: method, elementSort: tableHead});


    }
    // this.state.data[id]
    showUserCard(id) {
      this.setState({showUserId: id});
    }
    // set state.find
    changeFindInput(event) {
      this.setState({find: event.target.value});
    }
    // use state.fin for filter user
    filterUsers() {
      let word = this.state.find;
      let arr = this.props.data.filter( (item) =>{
        // string
        item.id +="";
        let result = item.firstName.includes(word) + item.lastName.includes(word) +
                     item.phone.includes(word) + item.email.includes(word) +
                     item.id.includes(word);
        return result > 0
        } );
        this.setState({data: arr, showUserId: "not"})
    }
    // state AddRow component
    addRow(stateObj) {
      let state = this.state.data.concat();
      state.unshift(stateObj);
      this.setState({data: state, add: false});

    }


}