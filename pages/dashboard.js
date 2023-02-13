import { Container, Grid, Card, Text, Spacer, Button, Row } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import '../styles/Dashboard.module.css'

export default function dashboard() {
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})
    // if(!session || !session.user){
    //     router.push("/")
    // }
  return (
    <Container fluid>
        <Spacer y={1} />
        <div style={{textAlign: "center"}}>
            <p> {(session && session.user) ? <h3>Welcome {session.user.name}</h3> : null}</p>
        </div>
         {/* <Grid.Container gap={2} justify="center">
            <Grid xs={4}>
            </Grid>
            <Grid xs={4}>
            {(session && session.user) ? <h3>Welcome {session.user.name}</h3> : null}
            </Grid>
            <Grid xs={4}>
            </Grid>
            </Grid.Container> */}
            <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '2%'}}>
      <Grid xs={4}>
      <Row justify="center" align="center">
        <Button color="gradient" style={{textAlign: "center"}}>Upload Files</Button>     
        </Row>  
      </Grid>
      <Grid xs={4}>
      <Row justify="center" align="center">
     <Button color="primary">Create Room</Button>
     </Row>
      </Grid>
      <Grid xs={4}>
      <Row justify="center" align="center">
      <Button color="success">List Files</Button>
      </Row>
      </Grid>
    </Grid.Container>
    <Container>
    <Row justify="center" align="center">
        <Button color="gradient"> Test</Button>
    </Row>
    </Container>
    </Container>
  )
}
