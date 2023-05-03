'use-client';
import {useState, useRef, useEffect} from 'react'
import { Container, Grid, Card, Text, Spacer, Button, Row, Col, Input} from "@nextui-org/react"
import {BsFillSendFill} from 'react-icons/bs'
import {GiLighthouse} from 'react-icons/gi'
import {GrAttachment} from 'react-icons/gr'
import Link from "next/link"
import {collection, addDoc, serverTimestamp, query, orderBy, limit, where} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import {getServerSession} from 'next-auth/next'

import {db} from '../../firebase'
import ChatMessage from '../../libs/components/ChatMessage'
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps(ctx){
    // TODO: Fix http & HTTPS based on url
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if(session){
    const response = await fetch(`http://${ctx.req.headers.host}/api/room/check?roomFriendlyId=${ctx.query.id}`, {headers: {Cookie: ctx.req.headers.cookie}});
    // console.log(response)
    const data = await response.json()
    console.log(data.message)
    if(data.message === 'success'){
        console.log("Valid")
        return {
            props: {
              id: ctx.query.id,
              roomName: data.roomName,
              roomId: data.roomId,
              userName: data.userName,
              userId: data.userId
            }
          };
    }
        return {
            redirect: {
              permanent: false,
              destination: "/dashboard",
            },
            props:{},
          };
        }
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props:{},
        };
    
  }


// Main Component
export default function Chat(props) {
  console.log(props)
  const router = useRouter()
  const { data: session } = useSession({required: true, 
    onUnauthenticated(){
        router.push("/")
    }})

    const dummyRef = useRef()
    const [messageVal, setMessageVal] = useState("")
    const messageRef = collection(db, "messages")
      // console.log("session", session)

    const q = query(messageRef, where("roomId", "==", props.roomId), orderBy('createdAt'), limit(25))

    const [messages, loading, error] = useCollectionData(q, {idField: 'id'})
    console.log(messages, loading, error)


  const sendMessage = async () =>{
    // e.preventDefault();
    console.log("pressed")

    // Add message to Firebase
    const docRef = await addDoc(collection(db, "/messages"), {
        roomId: props.roomId,
        sentBy: props.userId,
        userName: props.userName,
        userEmail: session.user.email,
        message: messageVal,
        type: "message",
        createdAt: serverTimestamp()
    })
    console.log("docsRef", docRef)
    setMessageVal("")
    // dummyRef.current.scrollIntoView({ behavior: 'smooth' });
    dummyRef.current.scrollIntoView();
  }

  const uploadFile = async (e) =>{
    const file = e.target.files[0]
    const fileName = encodeURIComponent(file.name)
    const fileType = encodeURIComponent(file.type)
    console.log(file, fileName, fileType)

    const res = await fetch(
      `/api/files/getSignedUrl?file=${fileName}&fileType=${fileType}`
    )
    console.log(res)
    const { url, fields } = await res.json()
    const formData = new FormData()
    // formData.append(file)
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    console.log(url, upload)
  
    if (upload.ok) {
      // TODO: Add details to firebase
      const docRef = await addDoc(collection(db, "/messages"), {
        roomId: props.roomId,
        sentBy: props.userId,
        userName: props.userName,
        userEmail: session.user.email,
        type: "file",
        publicUrl: `https://testminorbucket.s3.ap-south-1.amazonaws.com/${props.userId}/${fileName}`,
        createdAt: serverTimestamp()
    })
    console.log("docsRef", docRef)

    dummyRef.current.scrollIntoView();
      console.log('Uploaded successfully!')
    //   toast.success('File Uploaded Successfully!', {
    //     position: toast.POSITION.BOTTOM_RIGHT
    // }); 
    } else {
    //   toast.error('Error While Uploading File, Please Try Again Later', {
    //     position: toast.POSITION.BOTTOM_RIGHT
    // }); 
    }
  }
    return (
        <Container fluid>
        <Spacer y={1} />
        <div style={{textAlign: "center"}}>
            <h5>Room Name:&nbsp;<Link href={`/room/${props.id}`} size="xs"><GiLighthouse /></Link> &nbsp;{props.roomName} </h5>
                    </div>
                        <Container justify="center" alignItems="center" style={{marginTop: '1%'}}>
                    <Container fluid style={{overflowY: 'scroll', height: '310px', paddingInline:'2%' }}>
                      {/* boxShadow: "5px 10px 5px 5px #5b5377" */}
                        {messages && messages.map((message, index)=>(
                            <ChatMessage key={index} userEmail={message.userEmail} text={message.message} userName={message.userName} sessionEmail={session.user.email} time={message.createdAt} messageType={message.type} publicUrl={message.publicUrl ? message.publicUrl : ""}/> 
                        ))}
                        <span ref={dummyRef}></span>
                        </Container>
                        {/* </Row> */}
                    {/* <Row> */}
                        {/* <Row style={{position: 'fixed', height: '70px', bottom: 0, width: "100%"}}> */}
                        <Grid.Container justify='center' gap={2} style={{marginTop:'2%'}}>
                            {/* <Col>
                            </Col> */}
                            <Grid lg={2}></Grid>
                            <Grid lg={5}>
                            <Input clearable bordered labelPlaceholder="Message" width='380px' value={messageVal} onChange={(e)=>setMessageVal(e.target.value)}/>
                            </Grid>
                            <Grid lg={2}>
                            <input accept="image/*" id="file-upload-chat"
                            type="file" style={{ display: 'none' }} onChange={uploadFile}/>
                          <Button as="label" color="error" htmlFor="file-upload-chat" auto><GrAttachment /></Button>
                          </Grid> 
                            <Grid lg={3}>
                            <Button onClick={sendMessage} color="success" auto disabled={!messageVal}><BsFillSendFill />&nbsp;Send</Button>
                            </Grid>
                            <Col></Col>
                        </Grid.Container>
                    </Container>
                    </Container>
  )
}
