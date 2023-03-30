import { Container, Grid, Card, Text, Spacer, Button, Row } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import '../styles/Dashboard.module.css'
import axios from "axios"
import { IconButton, ButtonBase } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
export default function upload() {
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
        //router.push(`/room/${res.data.shortId}`)
    }
    const listRooms = async () => {
        const res = await axios.get("/api/room/list")
        console.log(res.data)
    }
    const uploadFile = async (e) =>{
      const file = e.target.files[0]
      const fileName = encodeURIComponent(file.name)
      const fileType = encodeURIComponent(file.type)

      const res = await fetch(
        `/api/files/getSignedUrl?file=${fileName}&fileType=${fileType}`
      )
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
    
      if (upload.ok) {
        console.log('Uploaded successfully!')
        // TODO: Add detials to MongoDB (Files Model)
      } else {
        console.error('Upload failed.')
      }
    }


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
{/* Put your content HEre */   
    <div style={{
        display: 'flex',
        margin: 'auto',
        width: 400,
        flexWrap: 'wrap',
      }}>
        <div style={{ width: '100%', float: 'left' }}>
          <h3>Upload your file here-</h3> <br />
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <h3>  OR  </h3>
        <input accept="image/*" id="icon-button-file"
          type="file" style={{ display: 'none' }} onChange={uploadFile}/>
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture"
          component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
}
        </Row>
        </Grid>
        </Grid.Container>
    </Container>
  )
}
