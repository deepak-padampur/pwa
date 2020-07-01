import React,{useEffect,useState} from 'react'
import SingleComment from "./SingleComment";




const ReplyComment=({commentList ,postId ,refreshFunction,parentCommentId})=>{
    const [childCommentCount,setChildCommentCount]=useState(0)
    useEffect(()=>{
        let commentCount=0;
        commentList.map(comment=>{
            if(comment.responseTo===parentCommentId){
                commentCount++
            }
        })
        setChildCommentCount(commentCount)

    })
    
    
    let renderReplyComment=(parentCommentId)=>(
        commentList&&commentList.map((comment,index)=>(



            <React.Fragment key={index}>
                {/*response To Id will be same as the parent comment id*/}
                {comment.responseTo===parentCommentId}

                <div style={{marginLeft:"50px",width:"80%"}}>
                    <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction}/>
                    <ReplyComment commentList={commentList} postId={postId}  refreshFunction={refreshFunction}/>
                </div>
            </React.Fragment>

        ))
    )
    return(<div>
        {childCommentCount>0&&  <p style={{fontSize:'14px',margin:0,color:'gray'}}>
            View {childCommentCount} more reply
        </p>}

        {renderReplyComment(parentCommentId)}

    </div>)
}

export default ReplyComment
