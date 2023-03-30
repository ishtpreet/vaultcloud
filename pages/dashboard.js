import { Container, Grid, Card, Text, Spacer, Button, Row, Table } from "@nextui-org/react"
import {useState} from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import '../styles/Dashboard.module.css'
import axios from "axios"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [roomsData, setRoomsData] = useState()
  const [showRooms, setShowRooms] = useState(false)
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})
    // if(!session || !session.user){
    //     router.push("/")
    // }

    const createRoom = async () => { 
        const res = await axios.post("/api/room/create")
        console.log(res.data)
        if(res.data.message == 'success')
        {
          toast.success(res.data.name+' Room Created!', {
            position: toast.POSITION.BOTTOM_RIGHT
        }); 
        }
        else{
          toast.error('Error Creating Room!', {
            position: toast.POSITION.BOTTOM_RIGHT
        }); 
        }
        //router.push(`/room/${res.data.shortId}`)
    }
    const listRooms = async () => {
      if(showRooms){
        setShowRooms(false)
      }
        const res = await axios.get("/api/room/list")
        console.log(res.data)
        if(res.data.message){
          setRoomsData(res.data.rooms)
          setShowRooms(true)
        }
        else{
          // TODO: Handle Error
          console.log("err")
        }
    }
     const uploadFile = () =>{
      // e.preventDefault();
      router.push("/upload")
     }


  return (
    <Container fluid>
        <Spacer y={1} />
        <div style={{textAlign: "center"}}>
            <p> {(session && session.user) ? <h3>Welcome {session.user.name}</h3> : null}</p>
        </div>
         {/* <Grid.Container gap={2} justify="center">
            <Grid xs={4}></Grid>
            </Grid>
            <Grid xs={4}>
            {(session && session.user) ? <h3>Welcome {session.user.name}</h3> : null}
            </Grid>
            <Grid xs={4}>
            </Grid>
            </Grid.Container> */}
            <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '2%'}}>
      <Grid xs={4}>
      {/* <Row justify="center" align="center">
        <Link href="/upload"><Button color="gradient" style={{textAlign: "center"}}>Upload Files</Button></Link>    
        </Row> */}
      <Row justify="center" align="center">
        <Button color="gradient" style={{textAlign: "center"}} onClick={uploadFile}>Upload Files</Button>    
        </Row>
      </Grid>
      <Grid xs={4}>
      <Row justify="center" align="center">
     <Button color="primary" onClick={createRoom}>Create Room</Button>
     </Row>
      </Grid>
      <Grid xs={4}>
      <Row justify="center" align="center">
      <Button color="success" onClick={listRooms}>{showRooms ? 'Hide Rooms' : 'List Rooms' }</Button>
      </Row>
      </Grid>
    </Grid.Container>
    <Container fluid>
    {showRooms && <Row justify="center" align="center">
      <Table
      aria-label="Rooms"
      bordered
      css={{
        height: "auto",
        // minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>S.No.</Table.Column>
        <Table.Column>Room Name</Table.Column>
        <Table.Column>Explore Room</Table.Column>
        <Table.Column>Share Room</Table.Column>
        <Table.Column>Delete Room</Table.Column>
      </Table.Header>
      <Table.Body>
        {/* Loop */}
        {roomsData && roomsData.map((room, key)=>
        <Table.Row key={key}>
          <Table.Cell>{key+1}</Table.Cell>
          <Table.Cell>{room.name}</Table.Cell>
          <Table.Cell><Button color="secondary" auto>Explore Room</Button></Table.Cell>
          <Table.Cell><Button color="primary" auto>Invite Friends</Button></Table.Cell>
          <Table.Cell><Button color="error" auto>Delete Room</Button></Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
        {/* <Button color="gradient"> Test</Button> */}
    </Row>}
    </Container>
    <ToastContainer />
    </Container>
  )
}
