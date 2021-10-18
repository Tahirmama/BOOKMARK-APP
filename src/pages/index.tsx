import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import "./style.css";
import Display from "../components/display"

const GET_BOOKMARKS = gql`
{
    bookmarks {
        id
        url
        title
    }
}
`;


const ADD_BOOKMARK = gql`
    mutation addBookmar($url: String!, $title: String!){
        addBookmark(url: $url, title: $title){
            id
        }
    }
`

export default function Home() {
//for date
var date = new Date().getDate(); //To get the Current Date
var month = new Date().getMonth() + 1; //To get the Current Month
var year = new Date().getFullYear(); //To get the Current Year
var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];

//to get inputs
    let titleField;
    let urlField;

    const { error, loading, data } = useQuery(GET_BOOKMARKS);
    const [addBookmark] = useMutation(ADD_BOOKMARK)


    const handleSubmit = () => {
        console.log(titleField.value);
        console.log(urlField.value)
    addBookmark({
        variables:{
            url:urlField.value,
            title:titleField.value,
        },
        refetchQueries:[{query:GET_BOOKMARKS}]
    })
    }

    if (error)
        return <h3>{error}</h3>
    if (loading)
        return <h3>Loading ....</h3>
    console.log(data)
    return (
        <div className="Container">

            <h1 className="heading">
                BOOKMARK APP
            </h1>
            <span className="cpr">
        © reserved by Tahir Muzaffar
      </span>
      <br/>
            <br/>
            <h3>
            Date :{" "}
            {n}{" "} {date}{"-"}{month}{"-"}{year}
          </h3>
        
            <hr />
            <br/>
            <label>
                <span className="title">
                Enter Bookmark Title :
                </span>
                <br />
                <br/>
                <input type="text" ref={node => titleField = node} required placeholder=" Enter Title" className="INPUT"/>
            </label>
            <br />
            <br/>
            <label >
            <span className="title">
                Enter Bookmark Url :
                </span>
                <br />
                <br/>
                <input type="text" ref={node => urlField = node} required placeholder=" Enter URL" className="INPUT"/>
            </label>
            <br />
            <br/>

            <button onClick={handleSubmit} className="Button" >ADD</button>
<br/>
<br/>
<hr/>
<br/>
            <h2>
                List Of Bookmarks :
                {/* {JSON.stringify(data.bookmarks)}  */}
            </h2>
            
            <div className="display-container">
            {data.bookmarks.map((bm) => <Display  url={bm.url} title={bm.title} />)}
        </div>
        </div>
    )
}