import React, {useState} from 'react'
import {Comment,Avatar,Button,Input}  from 'antd'
import {useSelector} from "react-redux";
import axios from 'axios'
const {TextArea}=Input

const SingleComment=({comment,postId ,refreshFunction})=>{
    const user=useSelector(state=>state.user)
    const [commentValue,setCommentValue]=useState()
    const [OpenReply,setOpenReply]=useState(false)
    const openReply=()=>{
        setOpenReply(!OpenReply)
    }

    const actions=[
        <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
    ]
    const handleChange=(e)=>{
        setCommentValue(e.target.value)


    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const variables={
            writer:user.userData._id,
            postId:postId,
            responseTo:comment._id,
            content:commentValue

        }
        axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.result)
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    refreshFunction(response.data.result)

                }else{
                    alert('Failed to save comment')
                }
            })

    }

    return(<div>
        {/*This is the single Comment Component*/}
        <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={
            <Avatar
            src={comment.writer.image}
            alt="writer"
            />
        }
        content={
            <p>{comment.content}</p>
        }
        ></Comment>
        {OpenReply&&  <form style={{display:"flex"}}>
            <TextArea
                style={{width:"100%",borderRadius:"5px"}}
                placeholder="Write Comments"
                onChange={handleChange}
                value={commentValue}

            />
            <br/>
            <Button type="primary" style={{width:"20%",height:"52px"}} onClick={onSubmit}>Submit</Button>
        </form>}


    </div>)

}

export default  SingleComment