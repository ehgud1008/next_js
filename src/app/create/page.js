"use client";

//next 12 버전에서 사용하기 때문에 navigation로 사용
//import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function Create(){
    //useRouter는 client 컴퍼넌트에서만 사용할 수 있음 
    const router = useRouter();
    return (
        <form onSubmit={(e) =>{
            e.preventDefault();
            //target == form 태그를 가르킴
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body}),
                cache: 'no-store'
            }
            fetch(process.env.NEXT_PUBLIC_API_URL, options)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    const lastid = result.id;
                    router.push(`/read/${lastid}`);
                });
        }}>
            <p>
                <input type = "text" name = "title" placeholder = "title"/>
            </p>
            <p>
                <textarea name = "body" placeholder = "title"/>
            </p>
            <p>
                <input type = "submit" value = "create"/>
            </p>
        </form>
    )
}