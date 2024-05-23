import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './css/AllQuestions.css'
import HtmlReactParse from 'html-react-parser';

function AllQuestions({ datas }) {
    const tags = datas?.tags?.[0] ? JSON.parse(datas.tags[0]) : [];
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    // console.log(question.body)
    return (
        <div className='all-questions'>
            <div className='all-questions-container'>
                <div className='all-questions-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>0</p>
                            <span>Votes</span>
                        </div>
                        <div className='all-option'>
                            <p>{datas?.answerDetails?.length}</p>
                            <span>Answer</span>
                        </div>
                        <div className='all-option'>
                            <small>0 Views</small>
                        </div>
                    </div>
                </div>
                <div className='question-answer'>
                    <Link to={`/question?q=${datas?._id}`}>
                        {datas?.title}
                    </Link>
                    <div style={{
                        width: "90%"
                    }}>
                        <div>
                            {HtmlReactParse(truncate(datas?.body, 200))}
                        </div>
                    </div>
                    <div style={{
                        display: "flex"
                    }}>
                        {
                            tags.map((_tag) => (
                                <>
                                    <span className='question-tags' >
                                        {_tag}
                                    </span>
                                </>
                            ))
                        }
                    </div>
                    <div className='author'>
                        <small>{new Date(datas?.created_at).toLocaleString}</small>
                        <div className='author-details'>
                            <Avatar src={datas?.user?.photo} />
                            <p>{datas?.user?.displayName
                                ? datas.user.displayName
                                : String(datas?.user?.email).split('@')[0]
                            }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllQuestions