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
  const [savingPost, setSavingPost] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // Function 1: Generate image only
  const generateImage = async () => {
    if (!form.prompt) {
      alert('Please provide a prompt.');
      return;
    }

    try {
      setGeneratingImg(true);

      const response = await fetch(`${BASE_URL}/dalle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Image generation failed');
      }

      setForm((prev) => ({
        ...prev,
        photo: `data:image/jpeg;base64,${data.photo}`,
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setGeneratingImg(false);
    }
  };

  // Function 2: Share post to DB
  const sharePost = async () => {
    if (!form.name || !form.prompt || !form.photo) {
      alert('Please provide your name, a prompt, and generate an image first.');
      return;
    }

    try {
      setSavingPost(true);

      const saveResponse = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          prompt: form.prompt,
          photo: form.photo.split(',')[1], // remove base64 header
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save image to the database');
      }

      alert('Image shared successfully!');
      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingPost(false);
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

      <div className="create-form">
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

        <div className="button-row">
          <button
            type="button"
            onClick={generateImage}
            className="btn-generate"
            disabled={generatingImg}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>

          <button
            type="button"
            onClick={sharePost}
            className="btn-share"
            disabled={savingPost}
          >
            {savingPost ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
