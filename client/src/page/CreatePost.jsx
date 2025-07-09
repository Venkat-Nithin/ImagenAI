import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import './CreatePost.css'; // ⬅️ Import plain CSS

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
  if (form.prompt) {
    try {
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
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
//     e.preventDefault();

//     if (form.prompt && form.photo) {
//       setLoading(true);
//       try {
//         const response = await fetch('http://localhost:8080/api/v1/post', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ ...form }),
// });
//         await response.json();
//         alert('Success');
//         navigate('/');
//       } catch (err) {
//         alert(err);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       alert('Please generate an image with proper details');
//     }
  };

  return (
    <section className="create-section">
      <div>
        <h1 className="section-title">Create</h1>
        <p className="section-description">
          Generate an imaginative image through DALL-E AI and share it with the community
        </p>
      </div>

      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="form-fields">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="image-preview">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="image-full" />
            ) : (
              <img src={preview} alt="preview" className="image-placeholder" />
            )}

            {generatingImg && (
              <div className="image-loader">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="button-group">
          <button type="button" onClick={generateImage} className="btn-generate">
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="share-section">
          <p className="share-info">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button type="submit" className="btn-share">
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
