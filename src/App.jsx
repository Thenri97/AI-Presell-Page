import { useState } from 'react'
import { Assistant } from './components/assistant/assistant'
import { HomePage } from './pages/HomPage'
import { DefaultTemplate } from './pages/defalutTemplate'

function App() {
  // const [count, setCount] = useState(0)

  // window.onbeforeunload = function() {
  //   return "Você tem certeza que quer sair do site?";
  // };
  // ss


  return (
    <>

      {/* <HomePage /> */}

      <DefaultTemplate>
        <HomePage/>
    
      </DefaultTemplate>



    </>
  )
}

export default App
