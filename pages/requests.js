'use client';
import { useEffect, useState } from "react"
import { Container, Grid, Card, Text, Spacer, Button, Row, Loading } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { useRouter } from "next/router"
import Link from "next/link"
import {TiTick} from 'react-icons/ti'
import {ImCross} from 'react-icons/im'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authOptions } from "./api/auth/[...nextauth]";

export default function ListRequests({data}) {
    // Check if user has any Room Invitations yet
    console.log(data)
    const showInvite = (data.message == 'success') ? true : false     
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})

const acceptInvite = async (e, requestId, roomId) =>{
  console.log(requestId, roomId)
    // setIsInviteLoading(true)
    axios.get(`/api/invite/accept?Id=${requestId}&roomId=${roomId}`)
    .then((res)=>{
      console.log(res.data)
      // setIsInviteLoading(false)
      // setReceiptEmail()
      // setRoomData()
      // TODO: Add Success Alert and close modal
      toast.success('Invite Accepted', {
        position: toast.POSITION.BOTTOM_RIGHT
    }); 
    })
    .catch((err)=>{
      console.log(err)
      // setIsInviteLoading(false)
      // setReceiptEmail()
      // setRoomData()
    })
}

  return (
    <Container fluid>
        <Spacer y={1} />
    <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '1%'}}>
      {!showInvite && <Row justify="center" align="center"> <h3> No Room Invites</h3></Row>}
        {(data && showInvite) && data.data.map((invite, key)=>
      <Row justify="center" align="center" key={key} style={{marginBottom: '12px'}}>
        <Card css={{ mw: "700px" }}>
        <Card.Body css={{ py: "$3" }}>
          <Text>
            Room Name: &nbsp;{invite.roomName}<br />
            Room Owner: {invite.createdBy.name} <br/>
            Invited on: {new Date(invite.createdAt).toLocaleDateString()}
          </Text>
        </Card.Body>
        {/* <Card.Divider /> */}
        <Card.Footer>
          {invite.accepted ? <Row justify="flex-end">
            <Button color="success" size="sm" auto disabled>Accepted</Button>
          </Row>:
          <Row justify="flex-end">
            <Button color="success" size="sm" auto onClick={(e)=>acceptInvite(e, invite._id, invite.roomId)}>
             <TiTick />&nbsp; Accept
            </Button>
            {/* <Button color="error" size="sm" auto><ImCross /> &nbsp;Decline</Button> */}
          </Row>}
        </Card.Footer>
      </Card>
        </Row>
        )}
        </Grid.Container>
        <ToastContainer />
    </Container>
  )
}

export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if(session){
      const res = await fetch(`http://${ctx.req.headers.host}/api/invite/get`, {headers: {Cookie: ctx.req.headers.cookie}})
      // console.log("res", res)
      const data = await res.json()
      console.log(data)
      // Pass data to the page via props
      return { props: { data } }
    }
    else{
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props:{},
      };
    }
  }
