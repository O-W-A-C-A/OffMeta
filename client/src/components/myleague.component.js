import React, {Component} from "react";
import axios from "axios";
import defaultimg from "../public/upload.png"
import profilesimg from "../public/default-img.png"
export default class MyLeague extends Component{

  
    constructor(){
        super();
        this.state = {
            leagueName:'',
            leagueSize:'',
            file: defaultimg,
            imagePreviewUrl: '',
            scoringFormat:'',
            members:[],
            img:'',
            imgs:[]
        }
    }
    componentDidMount(){

        axios.get(`http://localhost:5000/api/leagues/5eb8965bcb33cb61f47cf384`)
            .then((res) =>{
                this.setState({leagueName: res.data.leagueName, leagueSize: res.data.leagueSize,
                scoringFormat: res.data.scoringFormat, members: res.data.members})
                console.log(res)
            }).catch((err) =>{
                console.log(err)
            })


            axios.get(`http://localhost:5000/api/leagues/leaguelogo/5eb8965bcb33cb61f47cf384`,
            {responseType: 'arraybuffer'}
            ).then(res => {
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                  ),
                );
                this.setState({ file: "data:;base64," + base64 });
                //console.log(this.state.file)
              });
    }

    /*
    */
    renderLeagueMembers(){
        return this.state.members.map(member =>(
            <div key={member._id} className="my-league-member-wrapper">
                <div className="member-img">
                    
                </div>

                <div className="member-info">
                    {member.name}<br/>
                    {member.email}
                    {/*member.record*/}
                    {/*member.totalScore*/}
                </div>
                <div className="my-league-member-score">
                    Team Score: 
                </div>
            </div>
        ));
    }

    render(){
        return(
            <div className="my-league-panel">
                <div className="my-league-wrapper">
                    <div className="my-league-content">
                         
                         <div className="my-league-header">League</div>
                            {/*League Information*/}
                         <div className="my-league-quick-info">
                            {/*logo div*/}
                             <div className="my-league-logo-wrapper">
                                 <img className="my-league-logo" src={this.state.file} alt="league logo"/>
                             </div>
                            {/*league info wrapper div*/}
                            <div className="my-league-info-wrapper">
                                {/*league name div*/}
                                <div className="my-league-name">
                                    {this.state.leagueName}
                                </div>
                                {/*league content div*/}
                                <div className="my-league-info-content">
                                    {this.state.leagueSize}-Team&nbsp;
                                    {this.state.scoringFormat}&nbsp;|&nbsp;2020 Season
                                </div>
                            </div>
                         </div>
                    </div><br/><br/>
                </div>

                {/*League Member Information*/}
                <div className="my-league-wrapper">
                    <div className="my-league-header">League Members</div>
                    <div className="my-league-body">
                            {this.renderLeagueMembers()}
                    </div>
                </div>
            </div>
        );
        this.setState({ file: 'data:;base64,' + base64 });
        console.log(this.state.file);
      });
  }
  render() {
    return (
      <div className='my-league-panel'>
        <div className='settings-section form-section'>
          <div className='my-league-header'>League Members</div>
        </div>
      </div>
    );
  }
}
