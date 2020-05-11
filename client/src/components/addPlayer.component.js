import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//auth
import axios from 'axios';
import defaultimg from "../public/default-img.png"
export default class addplayer extends Component {
  constructor() {
    super();
    this.getPlayers = this.getPlayers.bind(this);
    this.changeNameState = this.changeNameState.bind(this);
    this.getPlayerByName = this.getPlayerByName.bind(this);
    this.state = {
      search: '',
      playerName:'',
      team:'',
      role:'',
      imageurl: defaultimg,
    };
  }
  /*
Purpose: Get Request To The Players Endpoint
*/
  getPlayers() {
    axios
      .get('https://api.overwatchleague.com/players')
      .then((res) => {
        // console.log(res.data.content[0]);
        let name = this.state.search;
        for (let i = 0; i < res.data.size - 1; i++) {
          let APIName = res.data.content[i].name;
          let ModifiedApiName = APIName.toLowerCase();
          let ModifiedName = name.toLowerCase();
          if (ModifiedApiName == ModifiedName) {
            console.log(res.data.content[i].name);
            console.log(res.data.content[i].headshot);
            this.setState({ imageurl: res.data.content[i].headshot,
                            playerName: res.data.content[i].name,             
            });
            break;
          } else {
            this.setState({ imageurl: defaultimg ,
              playerName: 'not found' });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeNameState(e) {
    const data = this.getPlayerByName(e);
    this.setState({ search: e.target.value });
    console.log(data + 'test');
  }

  /*
  Purpose: Grabs the data from the getPlayers function and searches a player by name
  Params@ name variable that holds the name of player we are searching for
  Returns@ if player found returns their headshot, id, and name
  */
  getPlayerByName = async (search) => {
    try {
      const data = this.getPlayers(search);
      console.log(data + 'test');
    } catch (error) {
      console.log('Player was not found');
    }
  };
  render() {
    return (
      <div>
        <div className="search-bar">
          <input type='text' className="search-bar-style"placeholder='Search Players' value={this.state.name}onChange={this.changeNameState}/>
        </div>
        <div className="show-results">
          <div className="player-img">
            <img src={this.state.imageurl} width='100' height='98' />
          </div>
          <div className="player-info">
            <form className="form-info">
              <label >Name</label><input value={this.state.playerName} disabled />
              <label >Team</label><input value={this.state.team} disabled />
              <label >Role</label><input value={this.state.role} disabled />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
