import React from "react";

export default function Commit (props) {
    return (
        <div className='commit' key={props.index}>
            <div className='commit-info'>
                <h4 className="committed-messahe">{props.data.commit.message}</h4>
                <p>Committed by <bold>{props.data.commit.committer.name}</bold> on <bold>{props.data.commit.committer.date}</bold></p>
            </div>
            <div className='commit-link'>
                <a href={props.data.html_url} className='commit-url'>More Details</a>
            </div>
        </div>
    )
}