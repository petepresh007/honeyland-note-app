import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { noteUrl } from "../server";


export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState("")

    async function searchdata() {
        try {
            const { data } = await axios.get(`${noteUrl}/search?topic=${searchQuery}`);
            setData(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

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

    return (
        <div className="search">
            <section className="search-center">
                <div className="search-center-content">
                    <h1>Search</h1>
                    <form onChange={searchdata}>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Note..."
                        />
                    </form>
                    <AiOutlineSearch className="search-icon" />
                </div>
            </section>

            <section className="search-content">
                {
                    data && data.map((data) => (
                        <div className="general-search-disp-center" key={data.id}>
                            <h1>Author: {data.author.substring(0, 30)}</h1>
                            <p>{data.subject}</p>
                            <p>{data.topic}</p>
                            <button
                                onClick={() => downloadFile(data.file)}
                                className="download-btn"
                            >download</button>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}