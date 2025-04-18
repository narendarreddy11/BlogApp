import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AxioWithtoken } from '../AxioWithToken';
import { MdPerson } from "react-icons/md";
import { FaRegClock, FaComments, FaCheckCircle, FaCommentAlt } from "react-icons/fa";
import { MdEdit, MdDelete, MdRestore } from "react-icons/md"; 
import './Article.css';
import { API } from './config';

function Article() {
  const { currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const { state } = useLocation();  // destructuring state from location
  const navigate = useNavigate();

  const [article, setArticle] = useState(state);
  const [showEditForm, setShowEditForm] = useState(false);  // To control showing of edit form
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(article?.comments || []);
  const [visibleComments, setVisibleComments] = useState(5);  // Number of comments to show initially

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [currentArticle, setcurrentArticle] = useState(state);

  const ISOtoUTC = (iso) => {
    const date = new Date(iso);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };
  const toggleArticleStatus = async () => {
    let art = { ...currentArticle };
    delete art._id;

    let res = await AxioWithtoken.put(
      `${API}/author-api/article/${currentArticle.articleId}`,
      art
    );

    if (res.data.message === "article deleted" || res.data.message === "article restored") {
      setcurrentArticle({ ...currentArticle, status: res.data.payload });
    }
  };

  useEffect(() => {
    setArticle(state);
  }, [state]);

  const writeComment = async (commonObj) => {
    commonObj.username = currentUser.username;
    let res = await AxioWithtoken.post(`${API}/user-api/comment/${article.articleId}`, commonObj);
    if (res.data.message === "Comment Posted") {
      setComment(res.data.message);
      setComments(prev => [...prev, commonObj]);
      reset();
    }
  };

  const enableEditState = () => {
    setShowEditForm(true);
  };

  const saveModifedArticle = async (editedArticle) => {
    let modifiedArticle = { ...state, ...editedArticle };
    modifiedArticle.dateOfModification = new Date();
    delete modifiedArticle._id;
    let res = await AxioWithtoken.put(`${API}/author-api/article`, modifiedArticle);
    if (res.data.message === "Article updated") {
      setShowEditForm(false);  // Hide form after saving
      navigate(`/author-profile/article/${modifiedArticle.articleId}`, { state: res.data.larticle });
    }
  };



  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 5); // Load 5 more comments on click
  };

  return (
    <div>
      {showEditForm === false ? (
        <>
          <div className="container mt-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h1 className="display-4 article-title">{article.title}</h1>
                    <div className="text-muted mt-2">
                      <small className="me-4">
                        <FaRegClock className="me-1" />
                        Created on: {ISOtoUTC(article.dateOfCreation)}
                      </small>
                      <small>
                        <FaRegClock className="me-1" />
                        Modified on: {ISOtoUTC(article.dateOfModification)}
                      </small>
                    </div>
                  </div>

                  {currentUser.userType === "author" && (
                    <div className="article-actions">
                      <button 
                        className="btn btn-outline-primary btn-sm me-2" 
                        onClick={enableEditState} 
                        style={{ borderRadius: '1.5rem', padding: '6px 18px', fontWeight: '500', transition: 'all 0.3s ease-in-out' }}
                      >
                        <MdEdit className="me-1" /> Edit
                      </button>

                      <button
                        onClick={toggleArticleStatus}
                        className={`btn btn-sm me-2 ${currentArticle.status ? "btn-outline-danger" : "btn-outline-success"}`}
                        style={{ borderRadius: '1.5rem', fontWeight: '500', padding: '6px 18px', transition: 'all 0.3s ease-in-out' }}
                      >
                        {currentArticle.status ? (
                          <>
                            <MdDelete className="me-1" /> Delete
                          </>
                        ) : (
                          <>
                            <MdRestore className="me-1" /> Restore
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </div>

                <p 
                  className="lead article-content" 
                  style={{ whiteSpace: 'pre-line', fontFamily: "'Georgia', serif", fontSize: '1.1rem', color: '#333', lineHeight: '1.6', textAlign: 'justify' }}
                >
                  {article.content}
                </p>

                <div className="comments my-4">
                  <h4 className="mb-3">
                    <FaComments className="me-2 text-info" />
                    Comments
                  </h4>

                  {comments.length === 0 ? (
                    <p className="display-5">No comments yet...</p>
                  ) : (
                    comments.slice(0, visibleComments).map((commonObj, ind) => (
                      <div key={ind} className="bg-light p-3 mb-3 rounded border" style={{ borderRadius: '10px', padding: '1.5rem' }}>
                        <p className="fs-5 fw-bold text-primary text-capitalize">
                          <MdPerson className="me-2" />
                          {commonObj.username}
                        </p>
                        <p className="fst-italic text-secondary">
                          <FaCommentAlt className="me-2" />
                          {commonObj.comment}
                        </p>
                      </div>
                    ))
                  )}

                  {/* Load More Button */}
                  {comments.length > visibleComments && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={loadMoreComments}
                      style={{ borderRadius: '1.5rem', padding: '8px 18px', fontWeight: '500', transition: 'all 0.3s ease-in-out' }}
                    >
                      Load More
                    </button>
                  )}
                </div>

                {comment && (
                  <h5 className="text-success d-flex align-items-center">
                    <FaCheckCircle className="me-2" />
                    {comment}
                  </h5>
                )}

                {currentUser.userType === "user" && (
                  <form 
                    className="p-3 rounded shadow-sm border bg-light" 
                    onSubmit={handleSubmit(writeComment)} 
                    style={{ width: '100%', maxWidth: '500px' }}
                  >
                    <div className="mb-3">
                      {errors.comment && <p className="text-danger">{errors.comment.message}</p>}

                      <input
                        type="text"
                        {...register("comment", { required: "Enter Something Related to Article..." })}
                        className="form-control"
                        placeholder="Write comment here..."
                        style={{ borderRadius: '0.5rem' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        border: '2px solid #198754',
                        color: '#198754',
                        padding: '8px 18px',
                        fontWeight: '500',
                        borderRadius: '1.5rem',
                        transition: 'all 0.3s ease-in-out'
                      }}
                    >
                      Add Comment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Edit form displayed in the center with a larger size
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <form
            className="p-5 shadow-lg rounded"
            style={{ width: '100%', maxWidth: '700px', backgroundColor: '#f8f9fa' }}
            onSubmit={handleSubmit(saveModifedArticle)}
          >
            <h4 className="text-center mb-4" style={{ color: '#7d8b3c' }}>
              Edit Article
            </h4>
            <div className="mb-4">
              <label className="form-label fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                {...register('title', { required: 'Title is required' })}
                defaultValue={article.title}
              />
              {errors.title && <p className="text-danger">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Select a category</label>
              <select
                className="form-select"
                {...register('category', { required: true })}
                defaultValue={article.category}
              >
                <option value="Programming">Programming</option>
                <option value="AIML">AIML</option>
                <option value="Database">Database</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Content</label>
              <textarea
                rows="10"
                className="form-control"
                {...register('content', { required: 'Content is required' })}
                defaultValue={article.content}
              />
              {errors.content && <p className="text-danger">{errors.content.message}</p>}
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success px-4 py-2" style={{ borderRadius: '1.5rem' }}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Article;
