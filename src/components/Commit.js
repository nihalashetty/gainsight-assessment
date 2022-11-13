import React from "react";

export default function Commit (props) {
    return (
        <div className='commit' key={props.index}>
            <div className='commit-info'>
                <h4 className="committed-messahe">{props.data.commit.message}</h4>
                <p>Committed by <b>{props.data.commit.committer.name}</b> on <b>{props.data.commit.committer.date}</b></p>
            </div>
            <div className='commit-link'>
                <a href={props.data.html_url} className='commit-url'>More Details</a>
            </div>
        </div>
    )
}