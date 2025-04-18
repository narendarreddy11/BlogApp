import React, { useState, useEffect } from 'react';
import { AxioWithtoken } from '../AxioWithToken';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Articles() {
  const [articleList, setArticleList] = useState([]);
  let navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);

  const getarticlesOfcurrentAuthor = async () => {
    let res = await AxioWithtoken.get(`http://localhost:4000/user-api/articles`);
    setArticleList(res.data.payload);
  };

  const ReadArticlebyArticleId = (articleobj) => {
    navigate(`../article/${articleobj.articleId}`, { state: articleobj });
  };

  useEffect(() => {
    getarticlesOfcurrentAuthor();
  }, []);

  const ISOtoUTC = (iso) => {
    const date = new Date(iso);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

  return (
    <div className="container mt-5">
      {articleList.length === 0 ? (
        <div className="text-center text-muted fs-4"> No articles Written By Author</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {articleList.map((article) => (
            <div className="col" key={article.articleId}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ transition: 'transform 0.2s ease-in-out' }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">{article.title}</h5>
                  <p className="card-text flex-grow-1 text-secondary" style={{ fontSize: '0.95rem' }}>
                    {article.content.substring(0, 80) + '...'}
                  </p>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: '#007bff',
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
                  <small className="text-muted">Last updated on {ISOtoUTC(article.dateOfModification)}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Articles;
