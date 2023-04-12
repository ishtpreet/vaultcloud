import { useEffect, useState } from "react"
import { Container, Grid, Card, Text, Spacer, Button, Row } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import {MdOpenInNew} from 'react-icons/md'
import {GiSettingsKnobs} from 'react-icons/gi'
import {AiFillDelete} from 'react-icons/ai'

export default function listRooms({data}) {
    // console.log(data)
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})


  return (
    <Container fluid>
        <Spacer y={1} />
    <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '1%'}}>
      
      <Row justify="center" align="center">
        {data && data.rooms.map((room, key)=>
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
            Room Name: {room.name} <br />
            Members: {room.members.length} <br />
            Last Modified: {new Date(room.updatedAt).toLocaleDateString()}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button as={Link} href={`/room/${room.shortId}`} color="success" size="sm" auto>
             <MdOpenInNew />&nbsp; Open
            </Button>&nbsp;
            <Button as={Link} href={`/room/${room.shortId}`} color="secondary" size="sm" auto>
             <GiSettingsKnobs />&nbsp; Settings
            </Button>&nbsp;
            <Button color="error" size="sm" auto><AiFillDelete /> &nbsp;Delete</Button>
          </Row>
        </Card.Footer>
      </Card>
        </Grid>
        )}
        </Row>
        </Grid.Container>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const res = await fetch(`http://${ctx.req.headers.host}/api/room/list`, {headers: {Cookie: ctx.req.headers.cookie}})
    // console.log("res", res)
    const data = await res.json()
    // console.log(data)
    // Pass data to the page via props
    return { props: { data } }
  }
