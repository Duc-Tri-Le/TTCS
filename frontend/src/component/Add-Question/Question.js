import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';// quill's css important
import './css/Question.css';
import { useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import { useHistory } from 'react-router-dom';
import { selectUser } from '../../feature/userSlice';
import axios from "axios";

function Question() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const user = useSelector(selectUser);

  const handelQuill = (value) => {
    setBody(value)
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    if (title !== "" && body !== "") {
      setLoading(true)
      const bodyJSON = {
        title: title,
        body: body,
        tag: JSON.stringify(tags),
        user: user,
      };
      await axios
        .post("http://localhost:80/api/question", bodyJSON)
        .then((res) => {
          // console.log(res.data);
          // alert("Question added successfully");
          setLoading(false)
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }
  }
  return (
    <div className='add-question'>
      <div className='add-question-container'>
        <div className='head-title'>
          <h1>Ask a public question</h1>
        </div>
        <div className='question-container'>
          <div className='question-options'>
            <div className='question-option'>
              <div className='title'>
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another person.
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type='test'
                  placeholder='e.g Is there an R function for 
                finding teh index of an element in a vector?
                '></input>
              </div>
            </div>
            <div className='question-option'>
              <div className='title'>
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handelQuill}
                  className='react-quill'
                  theme='snow' />
              </div>
            </div>
            <div className='question-option'>
              <div className='title'>
                <div className='wrapper'>
                  <div className='tags-title'>
                    <h5 className='title'>Tags</h5>
                    <p className='tag-subtitle'>
                      Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                    </p>
                    <TagsInput
                      value={tags}
                      onChange={setTags}
                      name="tags"
                      placeHolder="enter fruits"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit"
          onClick={handelSubmit}
          className="button"
          disabled={loading}
          formMethod="POST"
        >
          {loading ? 'Adding question...' : "Add your question"}
        </button>
      </div>
    </div>
  )
}

export default Question