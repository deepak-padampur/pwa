import React,{useEffect,useState} from 'react'
import {Link}from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { FaCode } from "react-icons/fa";
import {Card,Avatar,Col,Typography,Row,Divider,Spin} from 'antd'

const {Title}=Typography
const {Meta}=Card
function LandingPage() {
    const [videos,setVideos]=useState([])
    const [loading,setLoading]=useState(true)
    //fetch data from database
    useEffect(()=>{

        axios.get('/api/video/getVideos')
            .then(response=>{

                setLoading(true)
                if(response.data.success){
                    console.log(response.data);
                    setVideos(response.data.videos)

                    setLoading(false)


                }else{
                    setLoading(false)
                    alert("Failed to get videos")
                }
            })


    },[])

    const renderCards=videos.map((video,index)=>{
        let minutes=Math.floor(video.duration/60)
        let seconds=Math.floor(video.duration-minutes*60)
        let host='127.0.0.1' || '192.168.43.33'
        return ( <Col lg={6} md={8} xs={24} key={index}>
            <div style={{position:"relative"}}>
               <Link to={`/video/${video._id}`}>
                   <img style={{width:"100%"}} alt="thumbnail" src={`http://192.168.43.33:5000/${video.thumbnail}`}/>
                   <div className="duration"
                        style={{bottom:0,right:0,position:'absolute',margin:'4px',color:'#fff',backgroundColor:'rgba(17,17,17,0.8)',
                            opacity:'0.8',padding:'2px 4px',borderRadius:'2px',letterSpacing:'0.5px',fontSize:'12px',fontWeight:'500',
                            lineHeight:'12px'}}>
                       <span>{minutes} : {seconds}</span>
                   </div>
               </Link>
            </div><br/>
            <Meta
                avatar={
                    <Avatar src={video.writer.img}/>
                }
                title={video.title}
            />
            <span>{video.writer.name}</span><br/>
            <span style={{marginLeft:'3rem'}}>{video.views}</span>
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>)
    })


    return (
        <>
         <div style={{width:"85%",margin:"3rem auto"}}>

             <Divider orientation={"left"}> <Title level={2}>Recommended</Title></Divider>
          <Row >
              {loading?<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Spin/></div>: renderCards}
          </Row>

         </div>

        </>
    )
}

export default LandingPage
