'use-client';
import {useState, useRef, useEffect} from 'react'
import { Container, Grid, Card, Text, Spacer, Button, Row, Col, Input} from "@nextui-org/react"
import {BsFillSendFill} from 'react-icons/bs'
import {GiLighthouse} from 'react-icons/gi'
import Link from "next/link"
import {collection, addDoc, serverTimestamp, query, orderBy, limit, where} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import {db} from '../../firebase'
import ChatMessage from '../../libs/components/ChatMessage'

export async function getServerSideProps(ctx){
    // TODO: Fix http & HTTPS based on url
    
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

//   const AlwaysScrollToBottom = () => {
//     const elementRef = useRef();
//     useEffect(() => elementRef.current.scrollIntoView());
//     return <div ref={elementRef} />;
//   };


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
      console.log("session", session)

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
        createdAt: serverTimestamp()
    })
    console.log("docsRef", docRef)
    setMessageVal("")
    // dummyRef.current.scrollIntoView({ behavior: 'smooth' });
    dummyRef.current.scrollIntoView();
  }
    return (
        <Container fluid>
        <Spacer y={1} />
        <div style={{textAlign: "center"}}>
            <h5>Room Name:&nbsp;<Link href={`/room/${props.id}`} size="xs"><GiLighthouse /></Link> &nbsp;{props.roomName} </h5>
                    </div>
                        <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '1%'}}>
                <Grid xs={6}>
                <Row >
                    <Container fluid style={{overflowY: 'scroll', height: '280px'}}>
                        {messages && messages.map((message, index)=>(
                            <ChatMessage key={index} userEmail={message.userEmail} text={message.message} userName={message.userName} sessionEmail={session.user.email}/>
                        ))}
                        <span ref={dummyRef}></span>
                    <Row >
                        <Row style={{position: 'fixed', height: '80px', bottom: 0, width: "100%"}}>
                            {/* <Col>
                            </Col> */}
                            <Col>
                            <Input clearable bordered labelPlaceholder="Message" width='375px' value={messageVal} onChange={(e)=>setMessageVal(e.target.value)}/>
                            </Col>
                            <Col>
                            <Button onClick={sendMessage} color="success" auto disabled={!messageVal}><BsFillSendFill />&nbsp;Send</Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Row>
                    </Container>
                    </Row>
                    </Grid>
                    </Grid.Container>
                    </Container>
  )
}
