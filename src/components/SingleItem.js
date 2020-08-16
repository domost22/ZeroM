import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
class SingleItem extends React.Component{
    delete=()=>{
        const user = localStorage.getItem('user');
        const obj = JSON.parse(user)
        const jwt = obj.jwt;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + jwt);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://zm-job-application.herokuapp.com/movies/${this.props.id}`, requestOptions)
            .then(response => response.json())
            .then(this.props.history.push("/list"))
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    render() {
        return(
            <div className="single-item">

                    <img src={this.props.imgSrc} className="image-rectangle"/>
                    <label className="year-label">{this.props.year}</label>
                    <Link onClick={()=>this.delete()} to={this.path}  className="delete-label">Delete</Link>
                    <Link  to={`/edit/${this.props.id}`} className="edit-label">Edit</Link>
                    <label className="movie-title-label">{this.props.title}</label>
                    <div className="line"/>
            </div>
        )
    }
}
export default withRouter(SingleItem)
