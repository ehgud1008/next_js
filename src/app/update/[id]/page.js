"use client";

//next 12 버전에서 사용하기 때문에 navigation로 사용
//import { useRouter } from "next/router";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    //useRouter는 client 컴퍼넌트에서만 사용할 수 있음 
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect ( () => {
        fetch('http://localhost:9999/topics/'+id)
        .then(
            response => response.json()
        ).then(
              result => {
                setTitle(result.title);
                setBody(result.body);
            }
        );
    })
    return (
        <form onSubmit={(e) =>{
            e.preventDefault();
            //target == form 태그를 가르킴
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: "PATCH",    //수정할 때는 push나 patch 사용
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body}),
            }
            fetch(`http://localhost:9999/topics/`+id, options)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    const lastid = result.id;
                    router.refresh();
                    router.push(`/read/${lastid}`);
                });
        }}>
            <p>
                <input type = "text" 
                    name = "title" 
                    placeholder = "title" 
                    defaultValue = {title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </p>
            <p>
                <textarea name = "body" 
                    placeholder = "body" 
                    defaultValue={body}
                    onChange={(e)=>setBody(e.target.name)}
                />
            </p>
            <p>
                <input type = "submit" value = "update"/>
            </p>
        </form>
    )
}