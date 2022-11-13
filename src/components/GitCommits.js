import React from "react"
import Commit from "./Commit";
import { Octokit } from "octokit"

export default function GitCommits() {
    const [key, setKey] = React.useState('');
    const [commits, setCommits] = React.useState([]);

    const getCommits = async () => {
        const octokit = new Octokit({
            auth: `${key}`
        });


        const response = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
            owner: 'nihalashetty',
            repo: 'gainsight-assessment'
        });

        console.log(response)
        setCommits(response.data)
    }

    const commitElement = commits.map((item, index) => {
        return (
            <Commit key={index} data={item} index={index} />
        )
    });

    
    return (
        <main>
            <div></div>
            <input 
                type="text"
                placeholder="Enter Private Authentication Key"
                className="form--input"
                name="gitkey"
                value={key}
                onChange={e => setKey(e.target.value)}
            />
            <button 
                className="form--button"
                onClick={getCommits}
            >
                Submit
            </button>
            <div className="git-commits">
                {commitElement}
            </div>
        </main>
    )
}