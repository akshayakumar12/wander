import { auth, firestore } from "../../../firebase"
import { useState } from 'react'

export const GetUserInfo = () => {
    const [users, setUsers] = useState("")
    window.addEventListener('load', () => {
        getData();
    })

    const getData = () => {
        firestore.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                let data = element.data()
                setUsers(arr => [...arr, users])
            })
        })
    }

    return users;
}