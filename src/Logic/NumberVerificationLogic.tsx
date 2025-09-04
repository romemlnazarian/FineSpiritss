import { useState } from "react"


export default function NumberVerificationLogic() {

  const[check,setCheck] = useState(false)
  const[visible,setVisible] = useState(false)


const onSubmit = () =>{
  setVisible((prev)=>!prev)
}

const onHandler = () =>{

}

  return {
    check,
    onSubmit,
    visible,
    onHandler,
    setVisible
  }
}