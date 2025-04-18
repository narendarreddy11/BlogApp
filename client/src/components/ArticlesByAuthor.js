import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxioWithtoken } from '../AxioWithToken';
import { API } from './config';

function ArticlesByAuthor() {
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const [articleList, setArticleList] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(6); // Initial articles to show
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getarticlesOfcurrentAuthor = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found. Please log in again.');
        return;
      }

      const res = await AxioWithtoken.get(
        `${API}/author-api/articles/${currentUser.username}`
      );
      setArticleList(res.data.payload);
    } catch (err) {
      console.error('Error fetching articles:', err);
      if (err.response && err.response.data.message === 'jwt malformed') {
        console.error('JWT token is malformed. Please log in again.');
      }
      setArticleList([]);
    } finally {
      setLoading(false);
    }
  };

  const ReadArticlebyArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 6); // Load 6 more articles on click
  };

  useEffect(() => {
    if (currentUser?.username) {
      getarticlesOfcurrentAuthor();
    }
  }, [currentUser]);

  const ISOtoUTC = (iso) => {
    const date = new Date(iso);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

  if (loading) return <h4 className="text-center mt-5">Loading articles...</h4>;

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {Array.isArray(articleList) && articleList.length > 0 ? (
          articleList.slice(0, visibleArticles).map((article) => (
            <div className="col" key={article.articleId}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ transition: 'transform 0.2s ease-in-out' }}
              >
                <div className="card-body d-flex flex-column">
                  {/* Article Title Styled with Black */}
                  <h5 className="card-title text-dark fw-bold">{article.title}</h5>
                  {/* Article Content Styled with Darker Gray */}
                  <p className="card-text flex-grow-1 text-dark" style={{ fontSize: '0.95rem' }}>
                    {article.content.substring(0, 80) + '...'}
                  </p>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: '#007bff', // Original blue color
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease-in-out',
                      alignSelf: 'start',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#0056b3';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#007bff';
                    }}
                    onClick={() => ReadArticlebyArticleId(article)}
                  >
                    📖 Read More
                  </button>
                </div>
                <div className="card-footer bg-white border-0">
                  <small className="text-muted">
                    Last updated on {ISOtoUTC(article.dateOfModification)}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center fs-5 text-muted w-100">No articles found.</div>
        )}
      </div>

      {/* Load More Button with Green Color */}
      {articleList.length > visibleArticles && (
        <div className="text-center mt-4">
          <button
            className="btn"
            onClick={loadMoreArticles}
            style={{
              backgroundColor: '#28a745', // Green color for "Load More" button
              color: '#fff',
              borderRadius: '1.5rem',
              padding: '8px 18px',
              fontWeight: '500',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticlesByAuthor;
