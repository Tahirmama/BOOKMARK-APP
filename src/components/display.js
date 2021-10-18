import React from 'react';

export default function Display({ url, title }) {
    return <div className="display">
        <p className="url">
            URL : {' '}
            <b>{url}</b>
        </p>
        <p className="title">
            TITLE : {' '}
            {title}
            </p>
    </div>
}