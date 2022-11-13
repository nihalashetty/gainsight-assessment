import React from "react"
import Commit from "./Commit";
import { Octokit } from "octokit"

export default function GitCommits() {
    const [key, setKey] = React.useState(localStorage.getItem('publicKey') || '');
    const [commits, setCommits] = React.useState([]);
    const [time, setTime] = React.useState(30);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [invalidKey, setInvalidKey] = React.useState(false);

    //Check if key was present on localstorage and get commits on load
    React.useEffect(() => {
        if (key) {
            getCommits();
        }

    }, []);

    //Set Key to localstorage on change
    React.useEffect(() => {
        if (key) {
            localStorage.setItem('publicKey', key)
        }
    }, [key]);

    //Set timer and run for every 30Sec ones data is fetched
    React.useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
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
        setTime(30);
        setKey(e.target.value);
        setIsTimerActive(false);
    }

    const submitHandle = () => {
        if (key) {
            setTime(30);
            getCommits();
        }
    }

    const refreshHandle = () => {
        setTime(30);
        getCommits();
    }

    const getCommits = async () => {
        //{key} was throwing not a string exception, hence using `${key}`
        const octokit = new Octokit({
            auth: `${key}`
        });

        try {
            const response = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
                owner: 'nihalashetty',
                repo: 'gainsight-assessment'
            });

            setInvalidKey(false);
            setCommits(response.data);
            setIsTimerActive(true);
        } catch {
            setInvalidKey(true);
        }
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
                className='form--button'
                onClick={submitHandle}
                disabled={key ? '' : 'disabled'}
            >
                Submit
            </button>
            }
            
            <div className="git-commits">
                {isTimerActive ? commitElement : invalidKey ? <p className='error'>Invalid Key</p> : <p>Enter Private Key and Submit to get the git commits</p>}
            </div>
        </main>
    )
}