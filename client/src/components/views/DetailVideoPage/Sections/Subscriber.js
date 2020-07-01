/**
 *
 *
 * */

import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import axios from 'axios'

const Subscriber=({userTo,userFrom})=>{
    const [subscribeNumber,setSubscribeNumber]=useState(0)
    const [subscribed,setSubscribed]=useState(false)
    const subscribeNumberVariable={
        userTo:userTo,
        userFrom:userFrom
    }

    useEffect(()=>{

        axios.post('/api/subscribe/subscribeNumber',subscribeNumberVariable)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.subscribeNumber)
                    setSubscribeNumber(response.data.subscribeNumber)

                }else{
                    alert('Failed to get subscriber number')
                }
            })
        axios.post('/api/subscribe/subscribed',subscribeNumberVariable)
            .then(response=>{
                if(response.data.success){
                console.log(response.data.subscribed)
                    setSubscribed(response.data.subscribed)
                }else{
                    alert('Failed to ge subscribed Info')
                }
            })


    },[])

    const onSubscribe=(e)=>{
        let subscribeVariables={
            userTo:userTo,
            userFrom:userFrom
        }

        e.preventDefault()
        if(subscribed){
            //When we are already subscribed
            axios.post('/api/subscribe/unsubscribe',subscribeVariables)
                .then(response=>{
                    if(response.data.success){
                       if(subscribeNumber!==0){
                           setSubscribeNumber(subscribeNumber-1)
                       }
                        setSubscribed(subscribed)

                    }else{
                        alert("Failed to unsubscribe")
                    }
                })


        }else{
            axios.post('/api/subscribe/subscribe',subscribeVariables)
                .then(response=>{
                    if(response.data.success){
                        setSubscribeNumber(subscribeNumber+1)
                        setSubscribed(subscribed)

                    }else{
                        alert('Failed to subscribe')
                    }
                })
        }

    }




    return(<div>
        {/*{subscribed?( <Button type="danger" style={{textTransform:"upperCase"}} >{subscribeNumber}Subscribe</Button>):*/}
        {/*    ( <Button type="danger" style={{textTransform:"upperCase"}} disabled>{subscribeNumber}Subscribe</Button>)}*/}
        <Button
            onClick={onSubscribe}
            type="danger"
            style={{textTransform:"upperCase",background:subscribed?"#AAAAAA":"#d41212"}}
          >
            {subscribeNumber}Subscribe
        </Button>
    </div>)

}

export default Subscriber