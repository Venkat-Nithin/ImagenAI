import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import './CreatePost.css';
import { BASE_URL } from '../config';


const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${BASE_URL}/dalle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        if (response.ok) {
          setForm({
            ...form,
            photo: `data:image/jpeg;base64,${data.photo}`,
          });
        } else {
          alert(data.error || 'Failed to generate image');
        }
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a prompt.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Shared successfully!');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image before sharing.');
    }
  };

  return (
    <section className="create-container">
      <div className="create-header">
        <h1 className="create-title">Create an Image</h1>
        <p className="create-description">
          Enter a prompt to generate an imaginative image with AI, then share it with the community.
        </p>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <FormField
          labelName="Your Name"
          type="text"
          name="name"
          placeholder="Ex., John Doe"
          value={form.name}
          handleChange={handleChange}
        />

        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="A futuristic city floating in the clouds..."
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
        />

        <div className="image-preview-wrapper">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="image-preview"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="image-placeholder"
            />
          )}

          {generatingImg && (
            <div className="image-loader-overlay">
              <Loader />
            </div>
          )}
        </div>

        <div className="btn-group">
          <button
            type="button"
            onClick={generateImage}
            className="btn-generate"
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>

          <button
            type="submit"
            className="btn-share"
          >
            {loading ? 'Sharing...' : 'Share with Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
