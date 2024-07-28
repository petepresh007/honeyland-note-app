import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


export const WPSCREATE = () => {
    const [textValue, setTextValue] = useState("")

    return (
        <div className="create-wps">
            <form>
                <div>
                    <label>News: </label>
                    <ReactQuill
                        theme="snow"
                        value={textValue}
                        onChange={setTextValue}
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <button className='submit-write' type="submit">Submit</button>
            </form>
        </div>
    );
}