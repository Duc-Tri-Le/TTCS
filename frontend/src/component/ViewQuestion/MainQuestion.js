import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import './index.css'
import axios from 'axios';
import HTMLReactParser from 'html-react-parser/lib/index';
import { useSelector } from 'react-redux';
import { selectUser} from '../../feature/userSlice';


function MainQuestion() {
    const [questionData, setQuestionData] = useState();
    const [answer, setAnswer] = useState("");
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");
    // const [comments, setComments] = useState([]);
    const user = useSelector(selectUser);
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("q");

    const handleQuill = (value) => {
        setAnswer(value);
    };

    useEffect(() => {
      async function getFunctionDetails() {
        await axios
          .get(`http://localhost:80/api/question/${id}`)
          .then((res) => {
            console.log(res.data[0])
            setQuestionData(res.data[0])})
          .catch((err) => console.log(err));
      }
      getFunctionDetails();
    }, [id]);

    async function getUpdateAnswer() {
      await axios
        .get(`http://localhost:80/api/question/${id}`)
        .then((res) => {
          console.log(res.data[0])
          setQuestionData(res.data[0])})
        .catch((err) => console.log(err));
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      if(answer !== "")
        {
        const body = {
          question_id: id,
          answer: answer,
          user: user
        }
        
        const config = {
          headers:{
            "Content-Type": "application/json",
          }
        }

        await axios
          .post("http://localhost:80/api/answer", body, config)
          .then((res) => {
            console.log(res.data);
            // alert("answer added successfully");
            setAnswer("")
            getUpdateAnswer()
          })
          .catch((err) => {
            console.log(err);
          });
        }
    }

    const handleComment = async (e) =>{
      e.preventDefault()
        if(comment !== ""){
          const body ={
            question_id: id,
            comment : comment,
            user: user
          }
          await axios
        .post(`http://localhost:80/api/comment/${id}`, body)
        .then((res) => {
          console.log(res.data);
          // alert("answer added successfully");
          setComment("")
          setShow(false)
          getUpdateAnswer()
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">
            {questionData?.title}
          </h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              <p>{new Date(questionData?.created_at).toLocaleString()}</p>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>43times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">0</p>
                <p className="arrow">▼</p>
                <BookmarkIcon />
                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
              <p>
                {/* {console.log(questionData?.body)} */}
              {HTMLReactParser(questionData?.body || '')}
              </p>
              <div className="author">
                <small>
                    <p>Answered {new Date(questionData?.created_at).toLocaleString()}</p>
                </small>
                <div className="auth-details">
                <Avatar src={questionData?.user?.photo}/>
                        <p>{questionData?.user?.displayName 
                              ? questionData.user.displayName 
                              : String(questionData?.user?.email).split('@')[0]
                            }
                        </p>
                </div>
              </div>
              <div className="comments">
                {
                  questionData?.comments &&
                    questionData?.comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment} - {" "}
                        <span>
                          {_qd?.user?.displayName 
                            ? _qd.user.displayName 
                            : String(_qd?.user?.email).split('@')[0]
                          }
                        </span>
                        {"   "} {"  "}
                        <small>
                          {new Date(_qd?.created_at).toLocaleString()}
                        </small>
                      </p>
                    )
                  )
                }
                <p onClick={() => setShow(!show)}>
                  Add a comment
                  </p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{
            display : 'flex',
            flexDirection : 'column',
        }}className='all-question'>
            <p style={{
                marginBottom:"20px",
                fontSize:"30px",
                fontWeight:"300",
                color: "rgba(0, 0, 0, 0.8)",
                fontFamily: "Bold",
            }}>
              {questionData?.answerDetails?.length} Answer(s)
            </p>
            {
              questionData?.answerDetails?.map((_q, index) =>(
                <div key ={_q?._id} 
                  className='all-questions-container'
                >
                <div className='all-questions-left'>
                    <div className="all-options">
                        <p className="arrow">▲</p>
                        <p className="arrow">{index + 1}</p>
                        <p className="arrow">▼</p>
                        <BookmarkIcon />
                        <HistoryIcon />
                    </div>
                </div>
                <div className="question-answer">
              <p>
                {/* {console.log(_q?.answer)} */}
                  {HTMLReactParser(_q?.answer)}
              </p>
                <div className="author">
                  <p>
                    Answered {new Date(_q?.created_at).toLocaleString()}
                    </p>
                        <div className="auth-details">
                        <Avatar src={_q?.user?.photo}/>
                        <p>{_q?.user?.displayName 
                            ? _q.user.displayName 
                            : String(_q?.user?.email).split('@')[0]
                          }
                        </p>
                        </div>
                    </div>
                </div>               
            </div>
              ))
            }
        </div>
      </div>
      <div className='main-answer'>
        <h3 style={{
            fontSize:"22px",
            margin:"10px 0",
            fontWeight:"400"
        }}>Your Answer</h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <button
      type='submit'
      onClick={handleSubmit}
      style={{
        marginTop: "100px",
        maxWidth: "fit-content",
      }}>Post Your Answer</button>
    </div>
  )
}
export default MainQuestion