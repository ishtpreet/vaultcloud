'use client';
import { useEffect, useState } from "react"
import { Container, Grid, Card, Text, Spacer, Button, Row, Modal, useModal, Table, Popover, Input, Loading, Switch, Col } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { useRouter } from "next/router"
import Link from "next/link"
import {MdOpenInNew} from 'react-icons/md'
import {GiSettingsKnobs} from 'react-icons/gi'
import {AiFillDelete} from 'react-icons/ai'
import {BsShareFill, BsPersonCircle} from 'react-icons/bs'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authOptions } from "./api/auth/[...nextauth]";
import {useMediaQuery } from '../libs/utils/useMediaQuery'

export default function ListRooms({data}) {
    console.log(data)
    const isSm = useMediaQuery(650)
    const { setVisible, bindings } = useModal();
    const [roomData, setRoomData] = useState()
    const [isInviteLoading, setIsInviteLoading] = useState(false)
    const [receiptEmail, setReceiptEmail] = useState("")
    const [sharedRooms, setSharedRooms] = useState(false)
    
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})
const onPressSettingsBtn = async (e, roomData) =>{
  // e.preventDefault()
  //TODO: replace user ID with Username
  console.log("RoomData",roomData)
  setRoomData(roomData)
  setVisible(true)
}
const onPressDeleteBtn = async (e, roomData) =>{
  //e.preventDefault()
  console.log("RoomData",roomData)
  axios.get(`/api/room/delete?id=${roomData._id}`)
  .then((res)=>{
    console.log(res.data)
    toast.success('Room Deleted', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
  refreshData()
  })
  .catch((err)=>{
    console.log(err)
    toast.error('Room not Deleted', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
  })
}
const onPressCancelBtn = () =>{
  setVisible(false)
  setRoomData("")
}
const sendInvite = async () =>{
  if(receiptEmail && roomData){
    setIsInviteLoading(true)
    axios.get(`/api/invite/create?email=${receiptEmail}&roomName=${roomData.name}&Id=${roomData._id}`)
    .then((res)=>{
      console.log(res.data)
      // setIsInviteLoading(false)
      setReceiptEmail("")
      setVisible(false)
      setRoomData("")
      // setRoomData()
      // TODO: Add Success Alert and close modal
        toast.success('Invite sent', {
          position: toast.POSITION.BOTTOM_RIGHT
      });
        
    })
    .catch((err)=>{
      console.log(err)
      setIsInviteLoading(false)
      setReceiptEmail()
      toast.error('Invite not send', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
      // setRoomData()
    })
  }
}
const refreshData = () => {
  router.replace(router.asPath);
}
const onPressDeleteMemberBtn = async (member) =>{
  if(!member || !roomData){
    return
  }
  const roomId = roomData._id
  const memberId = member._id
  console.log("roomId && memberId", roomId, memberId)
  // const {roomId, memberId} = memeber
  axios.get(`/api/invite/deleteMember?roomId=${roomId}&memberId=${memberId}`)
  .then((res)=>{
    console.log(res.data)
    toast.success(`${member.name} removed from ${roomData.name}`,{
      position: toast.POSITION.BOTTOM_RIGHT
    })
    refreshData()
    setVisible(false)
    setRoomData("")
  })
  .catch((err)=>{
    console.log(err)
    toast.error("Error occured, please try again!",{
      position: toast.POSITION.BOTTOM_RIGHT
    })
  })

} 

  return (
    <Container fluid>
        <Spacer y={1} />
        <Row justify="center" alignItems="center">
        <Switch checked={sharedRooms} onChange={(e)=> setSharedRooms(!sharedRooms)} size="xl" iconOn={<BsShareFill />} iconOff={<BsPersonCircle />}/>
          </Row>
    <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '1%'}}>
      
      {/* <Row justify="center" align="center"> */}
      <Grid.Container gap={3} justify="center" alignItems="center">
        {data && !sharedRooms && data.rooms.map((room, key)=>
        <Grid xs={4} key={key}>
        <Card css={{ mw: "350px" }}>
        <Card.Image
            // src={`https://loremflickr.com/320/240`}
            src={`https://source.unsplash.com/user/wsanter/320x240`}
            objectFit="cover"
            width="100%"
            height={240}
            alt="Image"
        />
        <Card.Body css={{ py: "$10" }}>
          <Text>
            Room Name: {room.name} <br />
            Members: {room.members.length} <br />
            Last Modified: {new Date(room.updatedAt).toLocaleDateString()}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Grid.Container justify="center" alignItems="center" gap={1}>
            <Grid xs={4} lg={4} md={4}>
            <Button as={Link} href={`/room/${room.shortId}`} size='sm' color="success" auto>
             <MdOpenInNew />{isSm ? null : 'Open'}
            </Button>
            </Grid>
            <Grid xs={4} lg={4} md={4}>
            <Button onPress={(e) => onPressSettingsBtn(e, room)} size='sm' color="secondary" auto>
             <GiSettingsKnobs />{isSm ? null : 'Settings'}
            </Button>
            </Grid>
            <Grid xs={4} lg={4} md={4}>
            <Button color="error" size='sm' auto onClick={(e) => onPressDeleteBtn(e, room)}><AiFillDelete />  {isSm ? null : 'Delete'}</Button>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
        </Grid>
        )}
        {/* </Row> */}
        </Grid.Container>
        </Grid.Container>
        <Modal
        scroll
        blur
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
          {roomData &&  `Setting of ${roomData.name} Room` }
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/* <Text id="modal-description">
            Hi
          </Text> */}
          {roomData && <Table>
          <Table.Header>
        <Table.Column>S.No.</Table.Column>
        <Table.Column>Member Name</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body>
      {roomData.members.map((member, key)=>
      <Table.Row key={key}>
          <Table.Cell>{key+1}</Table.Cell>
          <Table.Cell>{member.name}</Table.Cell>
          <Table.Cell><Button color="error" auto onClick={(e)=> onPressDeleteMemberBtn(member)}>Remove</Button></Table.Cell>
          </Table.Row>)}
        </Table.Body>
          </Table>}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => onPressCancelBtn()}>
            Close
          </Button>
          <Popover isBordered>
            <Popover.Trigger>
          <Button auto >
            {/* onPress={() => onPressCancelBtn()} */}
            Add Member
          </Button>
            </Popover.Trigger>
            <Popover.Content>
            <Grid.Container
                css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}>
               <Row justify="center" align="center">
                <Input clearable bordered placeholder="Email" value={receiptEmail} onChange={(e)=> setReceiptEmail(e.target.value)}/>&nbsp;
                <Button color="secondary" auto onClick={sendInvite}>{isInviteLoading && <Loading color="primary" size="sm"/>}Invite</Button>
              </Row>
            </Grid.Container>
            </Popover.Content>
          </Popover>
        </Modal.Footer>
      </Modal>
      {/* Shared Rooms */}
      <Grid.Container gap={3} justify="center" alignItems="center">
      {data && sharedRooms && data.sharedRooms.map((sharedRoom, key)=>(
        <Grid xs={4} key={key}>
        <Card css={{ mw: "330px" }}>
        <Card.Image
            src={`https://loremflickr.com/320/240`}
            objectFit="cover"
            width="100%"
            height={240}
            alt="Image"
        />
        <Card.Body css={{ py: "$10" }}>
          <Text>
            Room Name: {sharedRoom.roomId.name} <br />
            Room Owner: {sharedRoom.createdBy.name} <br />
            Members: {sharedRoom.roomId.members.length} <br />
            Last Modified: {new Date(sharedRoom.roomId.updatedAt).toLocaleDateString()}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button as={Link} href={`/room/${sharedRoom.roomId.shortId}`} color="success" size="sm" auto>
             <MdOpenInNew />&nbsp; Open
            </Button>
          </Row>
        </Card.Footer>
      </Card>
        </Grid>
      ))}
      </Grid.Container>
      <ToastContainer />
    </Container>
  )
}

export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if(session){

      const res = await fetch(`http://${ctx.req.headers.host}/api/room/list`, {headers: {Cookie: ctx.req.headers.cookie}})
      // console.log("res", res)
      const data = await res.json()
      // console.log(data)
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
