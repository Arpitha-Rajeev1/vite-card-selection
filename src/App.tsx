import { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import "./App.css";

function App() {
  const [count, setCount] = useState<{id: number, title: string, userId: number}[]>([]);
  const [arr, setArr] = useState<number[]>([]);

  let storedNames = localStorage.getItem('array');
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => setCount(json));

    if(storedNames) {
      setArr(JSON.parse(storedNames))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(arr))
  }, [arr])
  

  const toggleSelect = (id: number) => {
    if (!arr.includes(id)) {
      setArr((array) => [...array, id]);
    } else {
      setArr(arr.filter((e) => e !== id));
    }
  };

  return (
    <Row className="m-5">
      {count &&
        count.map((element) => (
          <Col className="my-5" key={element.id} style={{ cursor: 'pointer'}}>
            <Card style={{ width: '18rem', border: arr.includes(element.id) ? '6px solid red' : '' }} onClick={() => {toggleSelect(element.id)}}>
              <Card.Img
                variant="top"
                src="https://vitejs.dev/og-image-announcing-vite3.png"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>{element.title}</Card.Text>
                <Button variant="primary">{element.userId}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
}

export default App;
