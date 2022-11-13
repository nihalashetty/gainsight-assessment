import React from "react"

export default function GitCommits() {
    return (
        <main>
            <div></div>
            <input 
                type="text"
                placeholder="Enter Private Authentication Key"
                className="form--input"
                name="gitkey"
            />
            <button 
                className="form--button"
            >
                Submit
            </button>
            <div className="git-commits">
                <p>Here you can see your git commits</p>
            </div>
        </main>
    )
}