import { Container, Grid, Card, Text, Spacer, Button, Row } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import '../styles/Dashboard.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FcUpload} from 'react-icons/fc'

export default function Upload() {
    let router = useRouter()
    const { data: session } = useSession({required: true, 
        onUnauthenticated(){
            router.push("/")
    }
})
    // if(!session || !session.user){
    //     router.push("/")
    // }

    const uploadFile = async (e) =>{
      const file = e.target.files[0]
      const fileName = encodeURIComponent(file.name)
      const fileType = encodeURIComponent(file.type)

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
        console.log('Uploaded successfully!')
        toast.success('File Uploaded Successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT
      }); 
        // TODO: Add detials to MongoDB (Files Model)
      } else {
        toast.error('Error While Uploading File', {
          position: toast.POSITION.BOTTOM_RIGHT
      }); 
      }
    }


  return (
    <Container fluid>
        <Spacer y={1} />
        <div style={{textAlign: "center"}}>
            <p> {(session && session.user) ? <h3>Welcome {session.user.name}</h3> : null}</p>
        </div>
            <Grid.Container gap={3} justify="center" alignItems="center" style={{marginTop: '2%'}}>
      <Grid xs={4}>
      <Row justify="center" align="center">
        <Container fluid>
          <Row justify="center" align="center">
        <input accept="image/*" id="icon-button-file"
          type="file" style={{ display: 'none' }} onChange={uploadFile}/>
        <label htmlFor="icon-button-file"><FcUpload /> &nbsp;Upload File 
        </label>
        </Row>
        </Container>
        </Row>
        </Grid>
        </Grid.Container>
        <ToastContainer />
    </Container>
  )
}
