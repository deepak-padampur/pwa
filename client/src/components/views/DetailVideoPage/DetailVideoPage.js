import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {List,Avatar,Typography,Spin,Row,Col} from 'antd'
import axios from 'axios'
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from './Sections/Comments'

const DetailVideoPage=(props)=>{
    //get parameter from the URL
   let videoId= props.match.params.videoId
    console.log('VideoId Fetched');
    const [video,setVideo]=useState([])
    const [commentList,setCommentList]=useState([])

    const videoVariable={
       videoId:videoId
    }

    useEffect(()=>{
        axios.post('/api/video/getVideo',videoVariable)
            .then(response=>{
                if(response.data.success){
                    console.log('Data fetched',response.data.video)
                    setVideo(response.data.video)
                }else{
                    alert('Failed loading the video')
                }
            })

        //fetch all the comments
        axios.post('/api/comment/getComments',videoVariable)
            .then(response=>{
                if(response.data.success){
                    console.log('Comments fetched',response.data.comments)
                    setCommentList(response.data.comments)
                }else{
                    alert('Failed loading the comments')
                }
            })


    },[])

    const updateComment=(newComment)=>{
        console.log('comment=',newComment)
        setCommentList(commentList.concat(newComment))

    }

    console.log('Video',video.filePath)
    if(video.writer){
        // alert(video.filePath);
        return(
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{width:"100%",padding:"3rem 4rem"}}>
                        <video style={{ width: '100%' }} controls>
                            <source  src={`http://192.168.43.33:5000/${video.filePath}`} type="video/mp4"/>
                        </video>
                        <List.Item
                            actions={[<Subscriber userTo={video.writer._id} userFrom={localStorage.getItem('userId')}/>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={video.writer&&video.writer.image}/>}
                                title={<a href="https://ant.design">{video.title}</a>}
                                description={video.description}
                            />
                            <div></div>
                        </List.Item>
                        <Comments
                            postId={video._id}
                            refreshFunction={updateComment}
                            commentList={commentList}/>

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo/>

                </Col>
            </Row>

           )
    }else{
        return (<div><Spin style={{display:"flex",justifyContent:"center",alignItems:"center"}}/></div>)
    }




}

export default DetailVideoPage
