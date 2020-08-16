import React from "react";
import FormInput from "../../components/FormInput";
import DropZone from "../../components/DropZone";
import SingleButton from "../../components/SingleButton";
import tree from '../../assets/tree.svg'
import cover from '../../assets/slika.png'
import {withRouter} from 'react-router-dom';
import {userContext} from "../../userContext";

class AddNew extends React.Component {
    state = {
        title: '',
        year: 0,
        preview: "",
        raw: null,
        data: null,
        value: '',
        url: '',
        error: null,
        jwt: null,

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let stateJwt = this.state.jwt
        if (stateJwt !== this.context.jwt) {
            this.setState({jwt: this.context.jwt});
        }
        if (this.state.jwt!==prevState.jwt){
            this.fetch();
        }

    }

    async componentDidMount() {
        const jwt = await this.state.jwt;
        if (jwt !== this.state.jwt) {
            this.fetch();
        }
        const update = await this.state.jwt;
        if (update ===this.state.jwt){
            this.fetch();
        }
    }

    fetch = () => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + this.state.jwt);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://zm-job-application.herokuapp.com/movies/${this.props.match.params.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({data: result});
                this.setState({title: result.title});
                this.setState({year: result.year});
                this.setState({url: result.poster.url});
            })
            .catch((error) => {
                console.error('Error:', error);
            })

    }

    handleChange = e => {
        if (e.target.files.length) {
            this.setState({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    update = () => {
        if ( null === this.state.raw) {
           this.setState({error: true})
            return
        }
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + this.state.jwt);
        const data = {
            title: this.state.title,
            year: this.state.year,
        };
        const sendData = JSON.stringify(data);
        const formdata = new FormData();
        formdata.append("data", sendData);
        formdata.append("files.poster", this.state.raw);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://zm-job-application.herokuapp.com/movies/${this.props.match.params.id}`, requestOptions)
            .then(response => response.json())
            .then( this.props.history.push("/home"))
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    createNew = () => {
        const jwt = this.context.jwt
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + jwt);
        const data = {
            title: this.state.title,
            year: this.state.year,
        };
        const sendData = JSON.stringify(data);
        const formdata = new FormData();
        formdata.append("data", sendData);
        formdata.append("files.poster", this.state.raw);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://zm-job-application.herokuapp.com/movies", requestOptions)
            .then(response => response.json())
            .then(this.props.history.push("/home"))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div className="layout">
                <label className="create-new-title">Create a new movie</label>
                <FormInput
                    formInputClassName="create-new-form-input"
                    labelClassName="title-label"
                    type="text"
                    inputClassName="title-input"
                    title="Title*"
                    onChange={(e) => {
                        this.setState({title: e.target.value});
                    }}
                    value={this.props.location.pathname.includes('/edit/') && this.state.title ? this.state.title : this.state.title}
                />
                <FormInput
                    formInputClassName="publication-form-input"
                    labelClassName="publication-label"
                    type="text"
                    inputClassName="publication-input"
                    title="Publication year"
                    onChange={(e) => {
                        this.setState({year: e.target.value});
                    }}
                    value={this.props.location.pathname.includes('/edit/') && this.state.year ? this.state.year : this.state.year}
                />
                <label className="cover-image-upload-title">Cover Image*</label>
                {this.props.location.pathname.includes('/edit/') ?
                    <>
                        <div className="group-div">
                            <img className="group-img" src={this.state.url} alt=""/>
                        </div>
                    </>
                    :
                    ''
                }
                {this.state.preview !== "" ? (
                    <div className="group-div">
                        <img className="group-img" src={this.state.preview} alt="selected"/>
                    </div>
                ) : ''}
                <DropZone
                    divClassName={this.props.location.pathname.includes('/edit/') || this.state.preview !== "" ? "dropZoneWithCover" : "dropZone"}
                    innerDivClassName="dropZoneInner"
                    labelClassName="dropZoneText"
                    text={this.state.error === true ? '**Choose Image**' : 'Drop Image Here'}
                    handleChange={this.handleChange}
                />

                <SingleButton
                    buttonDiv={this.props.location.pathname.includes('/edit/') || this.state.preview !== "" ? "add-new-button-div-with-cover" : "add-new-button-div"}
                    className="add-new-button"
                    labelClassName="add-new-button-text"
                    type="submit"
                    text={this.props.location.pathname.includes('/edit/') ? "Update" : "Create"}
                    onClick={this.props.location.pathname.includes('/edit/') ? () => this.update() : () => this.createNew()}
                />

                <SingleButton
                    buttonDiv={this.props.location.pathname.includes('/edit/') || this.state.preview !== "" ? "cancel-button-div-with-cover" : "cancel-button-div"}
                    className="cancel-button"
                    labelClassName="cancel-button-text"
                    type="submit"
                    text="Cancel"
                    onClick={() => this.props.history.push("/home")}
                />
                <img className="tree" src={tree} alt="e"/>
            </div>
        )

    }
}

export default withRouter(AddNew)
AddNew.contextType = userContext;
