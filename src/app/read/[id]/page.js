export default async function Read(props) {
    const response = await fetch(`http://localhost:9999/topics/${props.params.id}`, {cache:'no-store'});
    const topic = await response.json();
    console.log(topic);
    return (
        <>
            <h2>{topic.title}</h2>
            <h4>{topic.body}</h4>
        </>
    )
}