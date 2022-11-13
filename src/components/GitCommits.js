import React from "react"
import Commit from "./Commit";
import { Octokit } from "octokit"

export default function GitCommits() {
    const [key, setKey] = React.useState('');
    const [commits, setCommits] = React.useState([]);
    const [time, setTime] = React.useState(30);
    const [isTimerActive, setIsTimerActive] = React.useState(false);

    React.useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                console.log(time)
                setTime((time) => {
                    if (time === 0) {
                        getCommits();
                        return 30;
                    } else {
                        return time - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isTimerActive]);

    const changeHandle = (e) => {
        setKey(e.target.value);
        setIsTimerActive(false);
    }

    const submitHandle = () => {
        getCommits();
        setIsTimerActive(true);
    }

    const refreshHandle = () => {
        setTime(0);
        getCommits();
    }

    const getCommits = async () => {
        const octokit = new Octokit({
            auth: `${key}`
        });

        const response = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
            owner: 'nihalashetty',
            repo: 'gainsight-assessment'
        });

        setCommits(response.data)
    }

    const commitElement = commits.map((item, index) => {
        return (
            <Commit key={index} data={item} index={index} />
        )
    });

    
    return (
        <main>
            <input 
                type="text"
                placeholder="Enter Private Authentication Key"
                className="form--input"
                name="gitkey"
                value={key}
                onChange={e => changeHandle(e)}
            />
            {isTimerActive ? 
            <button 
            className="form--button"
            onClick={refreshHandle}
            >
                Auto Refresh in {time}s or Click to Refresh
            </button>
            :
            <button 
                className="form--button"
                onClick={submitHandle}
            >
                Submit
            </button>
            }
            
            
            <div className="git-commits">
                {commitElement}
            </div>
        </main>
    )
}