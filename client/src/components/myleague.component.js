import React, {Component} from "react";
import axios from "axios";
export default class MyLeague extends Component{
    constructor(){
        super();
        this.state = {
            leagueName:'',
            leagueSize:'',
            file: defaultimg,
            imagePreviewUrl: '',
        }
    }
    componentDidMount(){

        axios.get(`http://localhost:500/api/leagues/:id`)
            .then((res) =>{
                this.setState({leagueName: res.data.leagueName, leagueSize: res.data.leagueSize})
                console.log(res)
            }).catch((err) =>{
                console.log(err)
            })

        axios.get(`http://localhost:5000/api/leagues/leaguelogo/:id`,{responseType: 'arraybuffer'})
        .then(res => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),'',),);
                this.setState({ file: "data:;base64," + base64 });
                console.log(this.state.file)
              });
    }
    render(){
        return(
            <div className="my-league-panel">
                <div className="settings-section form-section">
                    <div className="my-league-header">League Members</div>
                   
                
                </div>
            </div>
        );
    }
}