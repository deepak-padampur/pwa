import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Col,Spin} from "antd";
import axios from 'axios'

const SideVideo=()=>{
    const [sideVideos,setSideVideos]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{

        axios.get('/api/video/getVideos')
            .then(response=>{

                setLoading(true)
                if(response.data.success){
                    console.log(response.data);
                    setSideVideos(response.data.videos)
                    setLoading(false)

                }else{
                    setLoading(false)
                    alert("Failed to get videos")
                }
            })


    },[])
    const sideVideosItem=sideVideos.map((video,index)=>{
        let minutes=Math.floor(video.duration/60)
        let seconds=Math.floor(video.duration-minutes*60)
     return(   <div key={index}>

         <div style={{display:"flex",marginTop:"1rem",padding:"0 2rem"}}>
             <div style={{width:"40%",marginRight:"1rem"}}>
                 <a href={`/video/${video._id}`}>
                     <img  style={{width:"100%"}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                 </a>
             </div>
             <div style={{width:"50%"}}>
               <a href={`/video/${video._id}`}>
                   <span style={{fontSize:"1rem",color:"black"}}>{video.title}</span><br/>
                   <span>{video.writer.name}</span><br/>
                   <span>{video.views}</span><br/>
                   <span>{minutes} : {seconds}</span><br/>
               </a>

             </div>
         </div>
     </div>)

    })


    return(
        <React.Fragment>
            <div style={{marginTop:"3rem"}}></div>
            {loading?<div style={{display:"flex",justifyContent:"center"}}><Spin/></div>:sideVideosItem}
        </React.Fragment>
    )
}
export default SideVideo