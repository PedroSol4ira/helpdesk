import Login from "./user/login";


export default function Home() {


  return (
    <div className="border flex flex-col justify-center bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: 'url("/images/bgindex.jpeg")'
      }}>
      <Login />

    </div>
  )
}