import axios from "axios";
import {noteUrl} from '../server';
import {useEffect, useState} from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai';


export const SubNote = () => {
    const [note, setNote] = useState('');

    useEffect(()=>{
        async function getTeacherNote(){
            try {
                const { data } = await axios.get(`${noteUrl}/allsubteach`);
                console.log(data)
                setNote(data);
            } catch (error) {
                console.log(error)
            }
        }
        getTeacherNote()
    }, []);

    const downloadFile = async (filename) => {
        try {
            const response = await fetch(`${noteUrl}/download/${filename}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const back = () => window.history.back();

    return (
        <div className="sub-note-teach">
            <AiOutlineArrowLeft className="sub-not-tech-arr" onClick={()=> back()}/>
            <div className="sub-note-teach-center">
                {note && note.map(data => {
                    return <div key={data._id} className="sub-note-teach-center-det">
                        <p>{data.subject}</p>
                        <p>{data.studentClass}</p>
                        <button onClick={() => downloadFile(data.file)}>Download</button>
                    </div>
                })}
            </div>
        </div>
    )
}