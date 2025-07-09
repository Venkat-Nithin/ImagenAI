import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, FormField, Loader } from '../components';
import './Home.css';
import { BASE_URL } from '../config';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="no-results">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/post`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="home-section">
      <div className="hero-section">
        <h1 className="hero-title">ImagenAI</h1>
        <p className="hero-subtitle">
          Explore and share AI-generated images with the community
        </p>
        <Link to="/create-post" className="hero-create-button">
          Create
        </Link>
      </div>

      <div className="search-form">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="results-section">
        {loading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="search-results">
                Showing Results for <span className="search-term">{searchText}</span>:
              </h2>
            )}
            <div className="card-grid">
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
