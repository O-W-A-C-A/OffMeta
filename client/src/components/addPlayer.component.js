import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios'
import defaultimg from "../public/default-img.png"

export default class addplayer extends Component {
    constructor(){
        super();
        this.getPlayers = this.getPlayers.bind(this);
        this.changeNameState = this.changeNameState.bind(this);
        this.getPlayerByName = this.getPlayerByName.bind(this);
    this.state = {
       name: '',
      imageurl:''
    }
    }
/*
Purpose: Get Request To The Players Endpoint
*/
getPlayers(){
    axios.get('https://api.overwatchleague.com/players')
    .then(res =>{
       // console.log(res.data.content[0]);
       let name = this.state.name
       for(let i=0; i<res.data.size-1;i++)
       {
         let APIName = res.data.content[i].name;
         let ModifiedApiName = APIName.toLowerCase();
         let ModifiedName = name.toLowerCase();
         if(ModifiedApiName == ModifiedName)
         {
             console.log(res.data.content[i].name);
             console.log(res.data.content[i].headshot);
             this.setState({imageurl: res.data.content[i].headshot});
         }
       }
    })
    .catch(error =>{
        console.log(error);
    })
    }
changeNameState(e){
    const data= this.getPlayerByName(e)
    this.setState({name:  e.target.value})
    console.log(data+'test');
}

  /*
  Purpose: Grabs the data from the getPlayers function and searches a player by name
  Params@ name variable that holds the name of player we are searching for
  Returns@ if player found returns their headshot, id, and name
  */
   getPlayerByName=async(name)=>{
    try {
        const data = this.getPlayers(name)
       console.log(data+'test')
        }
    catch (error) {
      console.log('Player was not found');
    }
  }
  render(){
      return(
        <div>
            <h1>
                {this.state.name}
            </h1>
            <input
                type = "text"
                placeholder="search players"
                value = {this.state.name}
                onChange = {this.changeNameState}
             />
             <img src ={
                 this.state.imageurl
             } alt={defaultimg}/>
        </div>
      );
  }
}
