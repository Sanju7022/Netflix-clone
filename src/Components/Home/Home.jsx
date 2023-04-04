import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apikey = "6c69dc1bd91811fe7ac4a32c1ca6e8e4";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcomig = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => {
        return <Card key={index} img={`${imgUrl}/${item.poster_path}`} />;
      })}
    </div>
  </div>
);

const Home = () => {
  const [upcomigMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcomig = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcomig}?api_key=${apikey}&page=2`);
      setUpcomingMovies(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);
      setNowPlayingMovies(results);
    };
    const fetchNowPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
      setPopularMovies(results);
    };
    const fetchNowTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      setTopRatedMovies(results);
    };
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenre(genres);
    };
    fetchUpcomig();
    fetchNowPlaying();
    fetchNowPopular();
    fetchNowTopRated();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[2]
            ? `url(${`${imgUrl}/${popularMovies[2].poster_path}`})`
            : "none",
        }}
      >
        {popularMovies[2] && <h1>{popularMovies[2].original_title}</h1>}
        {popularMovies[2] && <p>{popularMovies[2].overview}</p>}
        <div>
        <button> <BiPlay/>Play</button>
        <button>My list <AiOutlinePlus/></button>
        </div>
      </div>
      <Row title={"Upcoming "} arr={upcomigMovies} />
      <Row title={"Now playing "} arr={nowPlayingMovies} />
      <Row title={"Popular "} arr={popularMovies} />
      <Row title={"Top rated "} arr={topRatedMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
