import React, { useEffect, useState } from 'react';
import { AxioWithtoken } from '../AxioWithToken';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

function Adminarticles() {
  const [articlelist, setArticleList] = useState([]);
  const [deletingIds, setDeletingIds] = useState([]); // Track which articles are being deleted
  const navigate = useNavigate();

  async function getarticles() {
    try {
      const res = await AxioWithtoken.get('http://localhost:4000/admin-api/AllArticles');
      if (res.data.payload) {
        setArticleList(res.data.payload);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  }

  useEffect(() => {
    getarticles();
  }, []);

  const ISOtoUTC = (iso) => {
    const date = new Date(iso);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

  const ReadArticle = (articleobj) => {
    navigate(`../article/${articleobj.articleId}`, { state: articleobj });
  };

  const deleteArticle = async (articleobj) => {
    const articleIdinfo = { articleId: articleobj.articleId };

    // Show animation line
    setDeletingIds(prev => [...prev, articleobj.articleId]);

    // Wait for animation before actually deleting
    setTimeout(async () => {
      try {
        const res = await AxioWithtoken.put('http://localhost:4000/admin-api/deletearticle', articleIdinfo);
        if (res.data.message === 'deleted article') {
          setArticleList(prev => prev.filter(article => article.articleId !== articleobj.articleId));
        }
      } catch (err) {
        console.error("Error deleting article:", err);
      } finally {
        setDeletingIds(prev => prev.filter(id => id !== articleobj.articleId)); // Clean up
      }
    }, 500); // wait for 0.5s to let animation show
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Articles</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {articlelist.length === 0 ? (
          <p className="text-muted">No articles found.</p>
        ) : (
          articlelist.map((article) => (
            <div className="col" key={article.articleId}>
              <div
                className="card h-100 shadow-sm border-0 position-relative px-2"
                style={{
                  transition: 'transform 0.2s ease-in-out',
                  maxWidth: '95%',
                  overflow: 'hidden'
                }}
              >
                {/* 🔴 Animated Red Line on Deletion */}
                {deletingIds.includes(article.articleId) && (
                  <div
                    className="position-absolute top-0 start-0"
                    style={{
                      height: '4px',
                      backgroundColor: 'red',
                      width: '100%',
                      animation: 'shrinkLine 0.5s ease-out forwards',
                      zIndex: 2,
                    }}
                  ></div>
                )}

                {/* 🗑️ Delete icon */}
                <button
                  className="btn btn-sm position-absolute"
                  style={{
                    top: '10px',
                    right: '10px',
                    zIndex: 3,
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                  onClick={() => deleteArticle(article)}
                >
                  <MdDelete size={16} />
                </button>

                {/* 📄 Card Content */}
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold text-black"
                    style={{ paddingRight: '30px', minHeight: '48px' }}
                  >
                    {article.title}
                  </h5>

                  <p
                    className="mb-2"
                    style={{ fontSize: '0.9rem', color: '#343a40', fontWeight: '500' }}
                  >
                    Author: <span className="fw-semibold">{article.username}</span>
                  </p>

                  <p
                    className="card-text flex-grow-1"
                    style={{ fontSize: '0.95rem', color: '#343a40' }}
                  >
                    {article.content.substring(0, 80) + '...'}
                  </p>

                  <div className="d-flex justify-content-center mt-auto">
                    <button
                      className="btn btn-primary btn-sm px-3"
                      onClick={() => ReadArticle(article)}
                    >
                      📖 Read More
                    </button>
                  </div>
                </div>

                <div className="card-footer bg-white border-0">
                  <small style={{ color: '#495057', fontStyle: 'italic' }}>
                    Last updated on {ISOtoUTC(article.dateOfModification)}
                  </small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Red line shrink animation style */}
      <style>
        {`
          @keyframes shrinkLine {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}

export default Adminarticles;
