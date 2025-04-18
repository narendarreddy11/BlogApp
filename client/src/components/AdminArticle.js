import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function AdminArticle() {
    const { state } = useLocation(); // Accessing state passed via navigation

    const ISOtoUTC = (iso) => {
        const date = new Date(iso);
        return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    };

   

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0 position-relative">
                <div className="card-body">

                    {/* Article Content */}
                    <div>
                        <h1 className="display-4 article-title">{state.title}</h1>
                        <div className="text-muted mt-2">
                            <small className="me-4">
                                <FaRegClock className="me-1" />
                                Created on: {ISOtoUTC(state.dateOfCreation)}
                            </small>
                            <small>
                                <FaRegClock className="me-1" />
                                Modified on: {ISOtoUTC(state.dateOfModification)}
                            </small>
                        </div>
                    </div>

                    <p
                        className="lead article-content"
                        style={{
                            whiteSpace: 'pre-line',
                            fontFamily: "'Georgia', serif",
                            fontSize: '1.1rem',
                            color: '#333',
                            lineHeight: '1.6',
                            textAlign: 'justify'
                        }}
                    >
                        {state.content}
                    </p>

                </div>
            </div>
        </div>
    );
}

export default AdminArticle;
