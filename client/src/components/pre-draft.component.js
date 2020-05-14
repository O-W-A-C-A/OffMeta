import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

export default class PreDraft extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      draftRoom: [],
      leagueName: '',
      leagueID: '',
      leagueSize: 0,
      message: '',
    };
  }

  componentDidMount() {
    this.getLeagueInfo();
    this.getListOfMembers();
    var room;

    socket.on('connect', function () {
      socket.emit('room', room);
    });

    socket.on('chat message', ({ leagueName, message }) => {
      // Add new messages to existing messages in "chat"
      this.setState({
        chat: [...this.state.draftRoom, { leagueName, message }],
      });
    });
  }

  getListOfMembers() {
    axios
      .get(
        `http://localhost:5000/api/leagues/getmembers/5ebc4ec17ebd0e23a83fea58`
      )
      .then((res) => {
        this.setState({ list: res.data });
      })
      .catch((err) => {
        console.log('Error');
        console.log(err);
      });
  }

  getLeagueInfo() {
    axios
      .get(`http://localhost:5000/api/leagues/5ebc4ec17ebd0e23a83fea58`)
      .then((res) => {
        this.setState(
          { leagueName: res.data.leagueName, leagueSize: res.data.leagueSize },
          () => {
            console.log(this.state.leagueName);
            console.log(this.state.leagueSize);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  shuffle(array) {
    var i = 0,
      j = 0,
      temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  reverse(array) {
    array.reverse();
    return array;
  }

  onStartPreDraft() {}

  render() {
    return (
      <div className='predraft-container'>
        <div className='predraft-header'></div>
        <div className='predraft-body'>
          <div className='organize-predraft'></div>
          <div className='predraft-teams'></div>
          <div className='predraft-league-settings'>
            <div className='grouping-header'>
              <div className='setting-row'>
                <div className='setting-name'></div>
              </div>
            </div>

            <div className='grouping-header'>
              <div className='setting-row'>
                <div className='setting-name'></div>
              </div>
            </div>

            <div className='grouping-header'>
              <div className='setting-row'>
                <div className='setting-name'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
