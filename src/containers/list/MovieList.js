import React from "react";
import SingleItem from "../../components/SingleItem";
import image from '../../assets/slika.png'
import trees from "../../assets/stabla.svg";
import SingleButton from "../../components/SingleButton";

class MovieList extends React.Component{
    state={
        data:null,
    }
    componentDidMount() {
        const user = localStorage.getItem('user');
        const obj = JSON.parse(user)
        const jwt = obj.jwt;
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + jwt);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://zm-job-application.herokuapp.com/movies", requestOptions)
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {

        return(
            <div className="layout">
            {this.state.data&&this.state.data.length>=1?
                <>
                    <label className="single-item-title">Title</label>
                    <label className="single-item-options">Options</label>
                    <label className="single-item-publication">Publication Year</label>
                    <label className="single-item-cover-image">Cover Image</label>
                    <label className="single-item-movies">Movies</label>
                    {this.state.data ?this.state.data.map((list) => {
                        return <SingleItem
                            id={list.id}
                            imgSrc={list.poster&&list.poster.url}
                            year={list.year}
                            title={list.title}

                        />
                    }):''
                    }

                    </>
                :
                <>
                    <label className="splash-title">Your movie list is empty!</label>
                    <img className="trees" src={trees}/>
                    <SingleButton
                        route="/add-new"
                        buttonDiv="splash-button-div"
                        className="splash-button"
                        labelClassName="splash-button-text"
                        type="submit"
                        text="Create a new movie"
                    />
                    </>}
            </div>


        )

    }
}
export default MovieList
