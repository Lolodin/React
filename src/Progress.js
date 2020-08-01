import React from "react";
export default class Progress extends React.Component{
    constructor(props){
        super(props)
        this.state = {progress:""}
    }
    render() {
      return(
           <div>
               {this.state.progress}
           </div>
       )
    }

    componentDidMount() {
      this.time =  setInterval(()=>this.changeProgress(), 500);
      this.time2 = setInterval(()=>this.clearProgress(), 2100);
    }
    componentWillUnmount() {
      clearInterval(this.time);
      clearInterval(this.time2);
    }
    changeProgress() {
      let s = this.state.progress + ". ";
      this.setState({progress: s});
    }
    clearProgress() {
      this.setState({progress: ""});
    }
}