import React from 'react'
import { Link } from 'react-router-dom'
import { List } from '@mui/material';
import AllQuestions from './AllQuestions'
import './css/Main.css'
import FilterListIcon from '@mui/icons-material/FilterList';
import './index'

function Main({ question }) {
    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2>All questions</h2>
                    <Link to="/add-Question">
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className='main-desc'>
                    <p>{question && question.length}</p>
                    <div className='main-filter'>
                        <div className='main-tabs'>
                            <div className='main-tab'>
                                <Link>Newest</Link>
                            </div>
                            <div className='main-tab'>
                                <Link>Active</Link>
                            </div>
                            <div className='main-tab'>
                                <Link>More</Link>
                            </div>
                        </div>
                    </div>
                    <div className='main-filter-item'>
                        <FilterListIcon />
                        <p>Filter</p>
                    </div>
                </div>
            </div>
            <div className='questions'>
                {
                    question.map((_q, index) => (
                        <>

                            {/* {console.log(_q.body)} */}
                            <div key={index}
                                className='questions'
                            >
                                <AllQuestions datas={_q} />
                            </div>
                        </>))
                }
            </div>
        </div>
    )
}

export default Main