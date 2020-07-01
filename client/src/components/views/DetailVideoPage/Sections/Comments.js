import React,{useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from "./SingleComment";
import ReplyComment from './ReplyComment'
import {Button,Input,Divider} from 'antd'
const {TextArea}=Input


const Comments=({postId,refreshFunction, commentList})=>{
    const user=useSelector(state=>state.user)
    const [comment,setComment]=useState("")

    const handleChange=(e)=>{
        setComment(e.target.value)

    }
    const onSubmit=(e)=>{
        e.preventDefault()
        setComment("")
        const variables={
            content:comment,
            writer:user.userData._id,
            postId:postId
        }
        axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    //TODO-after submitting make the form empty
                    setComment("")
                    refreshFunction(response.data.result)


                }else{
                    alert('Failed to save comment')
                }
            })


    }
    return(<>

        <Divider>Comments</Divider>
        <p> replies</p>
        {/*Comment Lists*/}
        {console.log('Comments list',commentList)}
        {/*Root Comment Form*/}
        {commentList&&commentList.map((comment,index)=>(


            (!comment.responseTo&& <React.Fragment key={index}>

                <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction}/>
                <ReplyComment
                    commentList={commentList}
                    postId={postId}
                    refreshFunction={refreshFunction}
                    parentCommentId={comment._id}
                />
            </React.Fragment>)

        ))}

        <form style={{display:"flex"}} onSubmit={onSubmit}>
            <TextArea
                style={{width:"100%",borderRadius:"5px"}}
                placeholder="Write Comments"
                onChange={handleChange}
                value={comment}
           />
           <br/>
           <Button type="primary" style={{width:"20%",height:"52px"}} onClick={onSubmit}>Submit</Button>




        </form>

    </>)
}

export default Comments