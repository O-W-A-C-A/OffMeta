import React, {Component} from "react";
import {PersonAdd, SwapHorizontalCircle, Delete} from '@material-ui/icons'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

//auth
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultimg from '../public/default-img.png';

class MyTeam extends Component {
  constructor(props) {
    super(props);

    this.getPlayers = this.getPlayers.bind(this);
    this.changeNameState = this.changeNameState.bind(this);
    this.getPlayerByName = this.getPlayerByName.bind(this);
    this.onSubmitAddedPlayer = this.onSubmitAddedPlayer.bind(this);
    this.state = {
      name: '',
      imagePreviewUrl: '',
      file: defaultimg,
      //to track states of 3 modals
      showModal1: false,
      showModal2: false,
      showModal3: false,
      //player variables to add, drop and trade
      search: '',
      playerName:'',
      teamName:'',
      role:'',
      playerID:'',
      playerImg: defaultimg,
      //array to hold user's team
      myTeam:[]
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/users/${this.props.auth.user.id}`)
      .then((res) => {
        //console.log(res.data); for testing if data is actually receive
        this.setState({ name: res.data.name });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `http://localhost:5000/api/users/profileimage/${this.props.auth.user.id}`,
        { responseType: 'arraybuffer' }
      )
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.setState({ file: 'data:;base64,' + base64 });
      });

      axios.get(`http://localhost:5000/api/leagues/getuserteam/5eb6d50c81fbe72244a3bb54`,{
        params:{
          'ownerID': this.props.auth.user.id
        }
      })
      .then((res) =>{
        this.setState({myTeam: res.data})
        console.log(this.state.myTeam)//prints out team to console
      }).catch((err) =>{
        console.log(err)
      })
  }

  onSubmitAddedPlayer(e){
  e.preventDefault();
   const addNewPlayer = {
    playerID: this.state.playerID,
    playerName: this.state.playerName,
    ownerID: this.props.auth.user.id,
    playerImg: this.state.playerImg,
    teamName: this.state.teamName,
    role: this.state.role,
   }

 console.log(addNewPlayer)

 axios.post(`http://localhost:5000/api/leagues/addplayer/5eb6d50c81fbe72244a3bb54`, addNewPlayer)
 .then(res => {
   console.log(res.data)
 });
}

  //handles state change for images
  onFileChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  /******
   * ADD PLAYER
   */
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
          this.setState({ playerImg: res.data.content[i].headshot,
                          playerName: res.data.content[i].name,
                          teamName: res.data.content[i].teams[0].team.abbreviatedName,
                          role:res.data.content[i].attributes.role,
                          playerID: res.data.content[i].id     
          });
          break;
        } else {
          this.setState({ playerImg: defaultimg ,
            playerName: 'not found',
          teamName: 'not found',
          role: 'not found'});
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
}

/*
Purpose: Grabs the data from the getPlayers function and searches a player by name
Params@ name variable that holds the name of player we are searching for
Returns@ if player found returns their headshot, id, and name
*/
getPlayerByName = async (search) => {
  try {
    const data = this.getPlayers(search);
  } catch (error) {
    console.log('Player was not found');
  }
}
/******ADD PLAYER DONE */
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          className='my-team-user-img-2'
          src={imagePreviewUrl}
          alt='user profile img'
        />
      );
    } else {
      $imagePreview = (
        <img
          className='my-team-user-img-2'
          src={this.state.file}
          alt='user profile img'
        />
      );
    }
    return (
      <div className='my-team-panel'>
        <div className='my-team-edit'>
          <button
            onClick={() =>
              this.setState({
                showModal1: true,
                showModal2: false,
                showModal3: false,
              })
            }
          >
            <PersonAdd />
            <br />
            Add Player
          </button>
          <Modal
            show={this.state.showModal1}
            onHide={() => this.setState({ showModal1: false })}
          >
            <Modal.Header>
              <Modal.Title style={{color:'white'}} className="add-title">Add A Player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
        <div className="search-bar">
          <input type='text' className="search-bar-style"placeholder='Search Players' value={this.state.search} onChange={this.changeNameState}/>
        </div>
        <div className="show-results">
          <div className="player-img">
            <img src={this.state.playerImg} style={{borderRadius: '5px'}} width='100' height='98' />
          </div>
          <div className="player-info">
            <form className="form-info">
              <label>Name</label><input className ="player-fields" value={this.state.playerName} disabled />
              <label>Team</label><input className ="player-fields" value={this.state.teamName} disabled />
              <label>Role</label><input className ="player-fields" value={this.state.role} disabled />
            </form>
          </div>
        </div>
      </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => this.setState({ showModal1: false })}>Close</Button>
              <Button variant='primary'  onClick={this.onSubmitAddedPlayer}>Add</Button>
            </Modal.Footer>
          </Modal>

          <button
            onClick={() =>
              this.setState({
                showModal1: false,
                showModal2: true,
                showModal3: false,
              })
            }
          >
            <SwapHorizontalCircle />
            <br />
            Propose a Trade
          </button>

          <Modal
            show={this.state.showModal2}
            onHide={() => this.setState({ showModal2: false })}
          >
            <Modal.Header>
              <Modal.Title style={{color:'white'}}>Propose a Trade with Another User</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.setState({ showModal2: false })}
              >
                Close
              </Button>
              <Button variant='primary'>Propose</Button>
            </Modal.Footer>
          </Modal>

          <button
            onClick={() =>
              this.setState({
                showModal1: false,
                showModal2: false,
                showModal3: true,
              })
            }
          >
            <Delete />
            <br />
            Drop Player
          </button>
          <Modal
            show={this.state.showModal3}
            onHide={() => this.setState({ showModal3: false })}
          >
            <Modal.Header>
              <Modal.Title style={{color:'white'}}>Drop a Player from your Team</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.setState({ showModal3: false })}
              >
                Close
              </Button>
              <Button variant='primary'>Drop</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className='my-team-user'>
          <div className='my-team-user-img'>{$imagePreview}</div>

          <div className='my-team-username'>{this.state.name}</div>
        </div>

        <div className='my-team-starters-wrapper'>
          <div className='my-team-starters-header'>Starters</div>

          <div className='my-team-starters-body'></div>
        </div>

        <div className='my-team-bench'>
          <div className='my-team-bench-header'>Bench</div>

          <div className='my-team-bench-body'></div>
        </div>
      </div>
    );
  }
}

MyTeam.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyTeam);
