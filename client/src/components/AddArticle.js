import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const { currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const axioWithtoken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const [err, seterr] = useState('');

  const onSubmit = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;

    // Category logic
    if (article.customCategory) {
      article.category = article.customCategory;
      article.categoryType = "Customized";
    } else {
      article.categoryType = "Chosen";
    }

    let res = await axioWithtoken.post('http://localhost:4000/author-api/article', article);
    

    if (res.data.message === "new article created") {
      navigate(`/author-profile/articles-by-author/${currentUser.username}`);
    } else {
      seterr(res.data.message);
    }
  };

  const selectedCategory = watch('category');
  const customCategory = watch('customCategory');

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 shadow rounded"
        style={{ width: '500px', backgroundColor: '#f8f9fa' }}
      >
        <h4 className="text-center mb-4" style={{ color: '#7d8b3c' }}>
          Write an Article
        </h4>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        {/* Category or Custom */}
        <div className="mb-3">
          <label className="form-label">
            Select a category or enter your own (only one)
          </label>
          <select
            className="form-select mb-2"
            {...register('category')}
            disabled={customCategory?.length > 0}
          >
            <option value="">-- Select --</option>
            <option value="Programming">Programming</option>
            <option value="Database">Database</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Movie Story">Movie Story</option>
            <option value="Tech News">Tech News</option>
            <option value="Web Development">Web Development</option>
            <option value="Tweet Analysis">Tweet Analysis</option>
            <option value="Content Creation">Content Creation</option>
          </select>

          <input
            type="text"
            placeholder="Or enter a custom category"
            className="form-control"
            {...register('customCategory')}
            disabled={selectedCategory && selectedCategory !== ''}
          />
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            rows="6"
            className="form-control"
            {...register('content', { required: 'Content is required' })}
          />
          {errors.content && <p className="text-danger">{errors.content.message}</p>}
        </div>

        {/* Post Button */}
        <div className="text-end">
          <button type="submit" className="btn btn-success px-4">
            Post
          </button>
        </div>

        {err && <p className="text-danger text-center mt-2">{err}</p>}
      </form>
    </div>
  );
};

export default AddArticle;
