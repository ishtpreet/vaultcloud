import { useEffect, useState } from "react"
import { Container, Grid, Card, Text, Spacer, Button, Row } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import '../styles/Dashboard.module.css'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Listfiles({data}) {
    console.log(data.data.Contents)
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})
const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};


  return (
    <Container fluid>
        <Spacer y={1} />
    <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '2%'}}>
      
      <Grid.Container gap={3} justify="center" alignItems="center">
        {data.data && data.data.Contents.map((content, key)=>
        <Grid xs={4} key={key}>
        <Card css={{ mw: "330px" }}>
        <Card.Image
            src={`https://testminorbucket.s3.ap-south-1.amazonaws.com/${content.Key}`}
            objectFit="cover"
            width="100%"
            height={240}
            alt="Image"
        />
        <Card.Body css={{ py: "$10" }}>
          <Text>
            Name: {content.Key.split("/")[1]} <br />
            Size: {(content.Size/1024).toPrecision(2)} Kb<br />
            Last Modified: {new Date(content.LastModified).toLocaleDateString()}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button onClick={()=>openInNewTab(`https://testminorbucket.s3.ap-south-1.amazonaws.com/${content.Key}`)} color="success" size="sm" light>
              Open
            </Button>
          </Row>
        </Card.Footer>
      </Card>
        </Grid>
        )}
        </Grid.Container>
        </Grid.Container>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const res = await fetch(`http://${ctx.req.headers.host}/api/files/list`, {headers: {Cookie: ctx.req.headers.cookie}})
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
