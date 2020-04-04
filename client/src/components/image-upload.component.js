import React, { Component } from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            file: ''
        }
    }
    ''
    componentDidMount(){
        axios
        .get(
          'http://localhost:5000/api/users/profileimage/5e8551cd199aea57486be676',
          { responseType: 'arraybuffer' },
        )
        .then(response => {
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          this.setState({ file: "data:;base64," + base64 });
        });
    }

    onFileChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.file)
        axios.post("http://localhost:5000/api/users/uploadimage/5e8551cd199aea57486be676", formData, {
        }).then(res => {
            console.log(res)
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>

                <div>
                    <img src={this.state.file} alt={"profile picture"} alt="my image"/>
                </div>
            </div>
        )
    }
}