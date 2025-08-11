import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, Loader } from '../components';
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
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

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
        const posts = result.data.reverse();
        setAllPosts(posts);
        setFilteredPosts(posts);

        // Get unique user list for filter
        const uniqueUsers = [...new Set(posts.map((post) => post.name))];
        setUsers(uniqueUsers);
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

  const handleUserFilter = (e) => {
    const user = e.target.value;
    setSelectedUser(user);

    if (user === '') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter((post) => post.name === user));
    }
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

      {/* User Filter */}
      <div className="filter-form">
        <label htmlFor="userFilter" className="filter-label">Filter by User:</label>
        <select
          id="userFilter"
          value={selectedUser}
          onChange={handleUserFilter}
          className="filter-select"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="results-section">
        {loading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
        ) : (
          <div className="card-grid">
            <RenderCards
              data={filteredPosts}
              title="No Posts Found"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
