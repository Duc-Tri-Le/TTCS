import React, {useState} from 'react'
import './css/TagInput.css'
const TagInput = () =>{
    const [textInput, setTextInput] = useState('');
    const [tags, setTags] = useState([]);
    const addTags = (event) =>{
        if(event.key === 'Enter'){
            if(tags.length < 5){
                setTags([...tags, textInput]);
                setTextInput('')
            }
            else{            
            }
        }
    };
    //delete function
    const handleDeleteTag = (i) => {
        const newTags = tags.filter((tag, index) => index !== i)
        setTags(newTags)
    }

    return (
        <div className='wrapper'>
            <div className='tags-title'>
                <h5 className='title'>Tags</h5>
                <p className='tag-subtitle'>
                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                </p>
                {/* text input */}
                <input type='text'value={textInput} 
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={addTags}/>
                
                <div className='tags-wrapper'>
                    {tags?.map((tag,index) =>(
                        <main className='tags'>
                        <div className='remove-tags'onClick={() => handleDeleteTag(index)}>
                            X
                        </div>
                        <div className='tag'>
                            {tag}
                        </div>
                    </main>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default TagInput