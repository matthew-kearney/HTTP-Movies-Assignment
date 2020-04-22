import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: []
};

const UpdateForm = props => {

    const { id } = useParams();

    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        if (event.target.name === 'stars') {
            value = value.split(',');
        }

        setMovie({
            ...movie,
            [event.target.name]: value
        });
    };

    useEffect(() => {
        const movieToUpdate = props.movies.find(element => `${element.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    } , [props.movies, id]);

    const handleSubmit = e => {
        console.log("Submit was clicked");
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log("Axios call worked");
                
                props.setMovie(res.data);
                props.history.push("/");
            })
            .catch(err => console.log(err));
           
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit} className="form">
                <span>Title:</span> <input type="text" name="title" placeholder="title" onChange={changeHandler} value={movie.title} />
                <span>Name: </span><input type="text" name="director" placeholder="name" onChange={changeHandler} value={movie.director} />
                <span>Metascore:</span> <input type="text" name="metascore" placeholder="metascore" onChange={changeHandler} value={movie.metascore} />
                <span>Stars:</span> <input type="text" name="stars" placeholder="stars" onChange={changeHandler} value={movie.stars} />
                <span></span><input type="submit"  />

            </form>
        </div>
    );

};

export default UpdateForm;