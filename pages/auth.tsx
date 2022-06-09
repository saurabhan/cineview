import React, { useState } from 'react'
import Header from '../components/Header'
import { Input , Button} from '@nextui-org/react'
import firebase, { app, auth } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

interface Props {}

const Auth = (props: Props) => {

    const [ email , setEmail ] = useState<string>('')
    const [ password , setPassword ] = useState<string>('')


    const signupUser = (email:string, password:string) => {
        createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         console.log(user)
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         // ..
       });
    }

    


    return (
    <>
        <Header/>
        <div className='flex flex-col gap-10 justify-center items-center pt-48'>
            <div>
                <h1 className='font-bold text-2xl'>Login OR Signup</h1>
            </div>
            <div className='flex w-96 flex-col gap-y-8'>
                <Input onChange={(e) => setEmail(e.target.value)} labelPlaceholder='Email' required/>
                <Input.Password onChange={(e) => setPassword(e.target.value)} labelPlaceholder='Password' required/>
                <Button onClick={() => signupUser(email, password)} className='bg-red-700'>Sign In</Button>
            </div>
        </div>
    </>
  )
}

export default Auth