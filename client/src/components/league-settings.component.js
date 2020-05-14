import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import defaultimg from "../public/upload.png"

export default class LeagueSettings extends Component{
    constructor(props){
        super(props);
        //onSubmit function delcaration will handle submitting of form to the server
        this.onSubmit = this.onSubmit.bind(this);

        //function declaration for input fields that the user will modify
        this.onChangeLeagueName = this.onChangeLeagueName.bind(this);
        this.onChangeScoringFormat = this.onChangeScoringFormat.bind(this);
        this.onChangeLeagueSize = this.onChangeLeagueSize.bind(this);
        this.onChangeJoinCode = this.onChangeJoinCode.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

        this.state = {
            show: false,
            leagueName:'',
            scoringFormat: 'STD',
            leagueSize: 4,
            file: defaultimg,
            imagePreviewUrl: '',
            leagueID: this.props.leagueIDFromParent
        }
    }

    async componentDidMount(){
        await axios.get(`http://localhost:5000/api/leagues/${this.state.leagueID}`)
            .then((res) =>{
                this.setState({leagueName:res.data.leagueName, scoringFormat: res.data.scoringFormat,
                leagueSize: res.data.leagueSize, joinCode: res.data.joinCode})
            })
            .catch((err) =>{
                console.log(err)
            })

            await axios.get(`http://localhost:5000/api/leagues/leaguelogo/${this.state.leagueID}`,
        {responseType: 'arraybuffer'}
        ).then(res => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
            );
            this.setState({ file: "data:;base64," + base64 });
            console.log(this.state.file)
          });
    }

    //handles the state for when user enters a league name
    onChangeLeagueName(e){
        this.setState({
            leagueName: e.target.value
        })
    }

    //handles the state for when user clicks on a radio button to determine the
    //scoring format
    onChangeScoringFormat(e){
        this.setState({
            scoringFormat: e.target.value
        })
        //for testing
        //console.log(e.target.value)
    }

    //handles the state for when user clicks on a button to determine the league
    //size
    onChangeLeagueSize(e){
        this.setState({
            leagueSize: e.target.value
        })
        //for testing
        //console.log(e.target.value)
    }
    //handles the state change for join code
    onChangeJoinCode(e){
        this.setState({
            joinCode: e.target.value
        })
        //for testing
        //console.log(e.target.value)
    }

    //handles the the state for when the user uploads a league image
    //this image is optional
    //handles state change for images
    onFileChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    handleModal(){
        this.setState({show: !this.state.show})
    }
    
    onSubmit(e){
        e.preventDefault();

        
        const formData = new FormData();
        formData.append('logo', this.state.file);
        console.log(this.state.file)
        const updateLeague = {
            leagueName: this.state.leagueName,
            scoringFormat: this.state.scoringFormat,
            leagueSize: this.state.leagueSize,
            joinCode: this.state.joinCode,
        }


        //hardcoded for now hehe
        axios.post(`http://localhost:5000/api/leagues/update/${this.state.leagueID}`, updateLeague)
            .then((res) =>{
                console.log(res)
            }).catch((err) =>{
                console.log(err)
            });

        axios.put(`http://localhost:5000/api/leagues/uploadlogo/${this.state.leagueID}`, formData)
            .then(res => console.log(res))
            .catch((err) =>{
                console.log(err)
            });

       // window.location.reload(false)
    }

    render(){

        //magic
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="btn-upload-img" src={imagePreviewUrl} alt="League Logo"/>);
        }
         else{
            $imagePreview = (<img className="btn-upload-img" src={this.state.file} alt="League Logo"/>);
        }
        return(
            <div className="league-settings-panel">
                <div className="settings-section form-section">
                    <div className="settings-header">League Settings
                        <div className="right-edit">
                            {/*EDIT LEAGUE*/}
                            <button onClick={() => this.handleModal()} className = "edit-league-btn">
                                <i>Edit League</i>
                            </button>
                            <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                                <Modal.Header>
                                    <Modal.Title style={{color: 'white'}}>Edit League</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="edit-league-wrapper">
                                        <div style={{paddingBottom:'20px'}}>
                                            <label>League Logo</label><br/>
                                            <input type="file" onChange={this.onFileChange} style={{color: 'white'}} />
                                        </div>
  
                                        <div>
                                        <label>League Name</label><br/>
                                        <input type="text" className="modal-edit-league-input" placeholder="League Name" value={this.state.leagueName} onChange={this.onChangeLeagueName}/>
                                    </div>

                                    <div>
                                        <label>League Size</label><br/>
                                        <div className="btn-group-teams">
                                        <ul className="league-size">
                                            <li>
                                                <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {4} id="size4"/>
                                                <label htmlFor="size4">4 Teams</label>
                                            </li>
                                            <li>
                                                <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {6} id="size6"/>
                                                <label htmlFor="size6">6 Teams</label>
                                            </li>
                                            <li>
                                                <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {8} id="size8"/>
                                                <label htmlFor="size8">8 Teams</label>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div div className="scoringFormat">
                                   <br/><label>Scoring Format</label><br/>
                                        {/* Radio Buttons that determine the scoring format depending on what the user selects */}
                                        <input className="radio-scoring" type="radio" value="STD" onChange = {this.onChangeScoringFormat} name="scoring-format" /> STD
                                        <br></br>
                                        <input className="radio-scoring" type="radio" value="PPA" onChange = {this.onChangeScoringFormat} name="scoring-format"/> PPA
                                        <br></br>
                                        <input className="radio-scoring" type="radio" value="0.5 PPA" onChange = {this.onChangeScoringFormat} name="scoring-format"/> 0.5 PPA
                                
                                    </div>
                                    <div>
                                        <label>Join Code</label><br/>
                                        <input type="text" className="modal-edit-league-input" placeholder="Join Code" value={this.state.joinCode} onChange={this.onChangeJoinCode}/>
                                    </div>
                                    </div>  
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={() => this.setState({ show: false })}>Close</Button>
                                    <Button variant='primary'  onClick={this.onSubmit}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        {/*END EDIT LEAGUE*/}

                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">League Name</div>
                        <div className="settings-value">{this.state.leagueName}</div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">League Logo</div>
                        <div className="settings-value">{$imagePreview}</div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">League Size</div>
                        <div className="settings-value">{this.state.leagueSize}</div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">Scoring Format</div>
                        <div className="settings-value">{this.state.scoringFormat}</div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">Join Code</div>
                        <div className="settings-value">{this.state.joinCode}</div>
                    </div>
                </div>

                
                <div className="settings-section form-section">
                    <div className="settings-header">Scoring Settings
                    </div>
                    <div className="grouping-header">DPS</div>
                    <div className="settings-row">
                        <div className="settings-name2">Eliminations</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div><br/>
                    <div className="settings-row">
                        <div className="settings-name2">Assists</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                    <div className="grouping-header">TNK</div>
                    <div className="settings-row">
                        <div className="settings-name2">Damage Absorbed</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                    <div className="grouping-header">SPT</div>
                    <div className="settings-row">
                        <div className="settings-name2">Healing Done</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                    <div className="grouping-header">MISC</div>
                    <div className="settings-row">
                        <div className="settings-name2">Objective Time</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div><br/>
                    <div className="settings-row">
                        <div className="settings-name2">Ultimates Earned</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}