import  React,{useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Typography,Button,Form,message,Input,Icon} from 'antd'
import Dropzone from 'react-dropzone'

const {Title}=Typography
const {TextArea}=Input

/**
 * @author Chhanda Charan <deepak-padampur>
 *     @description Upload Video
 *     @createdAt Jun 27 18:55:48
 * */

const Privacy=[
    {value:0,label:"Private"},
    {value:1,label:"Public"}
]
const Category=[
    {value:0,label:"Film&Animation"},
    {value:0,label:"Education"},
    {value:0,label:"Music"},
    {value:0,label:"Sports"},
    {value:0,label:"Wild life"}
]


function UploadVideoPage(props){
    const user=useSelector(state=>state.user)

    const [title,setTitle]=useState("")
    const [privacy,setPrivacy]=useState(0)
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("Film&Animation")
    const [filePath,setFilePath]=useState("")
    const [duration,setDuration]=useState("")
    const [thumbnail,setThumbnail]=useState("")


    const handleChangeTitle=(e)=>{
        setTitle(e.target.value)
    }

    const handleChangeDescription=(e)=>{
        setDescription(e.target.value)
    }
     const  handleChangeOne=(e)=>{
        setPrivacy(e.target.value)
     }
     const handleChangeTwo=(e)=>{
        setCategory(e.target.value)
     }

     const onSubmit=(e)=>{
        e.preventDefault()
         //to prevent the empty submit
         if(user.userData&&!user.userData.isAuth){
             return alert("Please login to upload video")
         }
         if(title===""||description===""||category===""||filePath===""||duration===""||thumbnail===""){
             return alert("please fill the required field")

         }
         const variables={
            writer: user.userData._id,
             title: title,
             description:description ,
             privacy:privacy ,
             filePath: filePath,
             category:category ,

             duration: duration,
             thumbnail: thumbnail,

         }
         axios.post('/api/video/uploadVideo',variables)
             .then(response=>{
                 if(response.data.success){
                      alert('Video Uploaded Successfully')
                     props.history.push('/')

                 }else{
                     alert('Failed to Upload Video')
                 }
             })


     }
     //upload file handler
     const onDrop=(files)=>{

        let formData=new FormData
         const config={
            header:{'Content-type':'multipart/form-data'}
         }
         console.log('files',files)
         formData.append("file",files[0])

         axios.post('/api/video/uploadfiles',formData,config)
             .then(response=>{
                 if(response.data.success){
                     console.log(response)
                     const {filePath,fileName}=response.data
                     console.log(filePath,fileName);
                     let variable={
                         filePath:filePath,
                         fileName:fileName
                     }
                     console.log(variable)
                     setFilePath(variable.filePath)
                     //Generating the thumbnail with the file path
                     axios.post('/api/video/thumbnail',variable).then(response=>{
                         if(response.data.success){
                             setDuration(response.data.fileDuration)
                             setThumbnail(response.data.thumbsFilePath)

                         }else{
                             alert('Failed to make the thumbnail')
                         }
                     })


                 }else{
                     alert('Failed Uploading the video ')
                 }


             })


     }







    return(<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Upload Video</Title>
        </div>

        <Form
            onSubmit={onSubmit}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                             {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>

                {thumbnail !== "" &&
                <div>
                    <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                </div>
                }

            </div>

            <br /><br />
            <label>Title</label>
            <Input
                onChange={handleChangeTitle}
                value={title}
            />
            <br /><br />
            <label>Description</label>
            <TextArea
                onChange={handleChangeDescription}
                value={description}
            />
            <br /><br />

            <select
                onChange={handleChangeOne}
            >
                {Privacy.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <select
                onChange={handleChangeTwo}
            >
                {Category.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <Button
                type="primary"
                size="large"
                onClick={onSubmit}
            >
                Submit
            </Button>

        </Form>
    </div>)

}

export default UploadVideoPage
