import React, { useState, useEffect, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import io from "socket.io-client";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";



const connOpt = {
    transports: ["websocket"], // socket connectin options
  };
  let socket = io("https://striveschool.herokuapp.com/", connOpt); //socket instance

function Chat() {
    const [username, setUsername] = useState("user1");
    const [list, setList] = useState([]);
    const [receiver, setReceiver] = useState("");//socketId
    const [text, setText] = useState("");
    

    useEffect(() => {
        socket.on("bmsg", (msg) => setText((text) => text.concat(msg)));
        //listening to any event of type "bmsg" and reacting by calling the function
        //that will append a new message to the "messages" array
    
        socket.on("connect", () => console.log("connected to socket")); //check if socket is connected
       
        return () => socket.removeAllListeners(); //componentWillUnmount
      }, []);



    //   const getList = useCallback(async () => {
    //   let response= await fetch("https://striveschool-api.herokuapp.com")
    //   let list = await response.json()
    //   console.log("list",list)
    //   }, []);



      useEffect(
          (
          async ()=>{
          let response= await fetch("https://striveschool-api.herokuapp.com")
           let list = await response.json()
           console.log("list",list)
           } ) (), []);

      const sendMessage = (e) => {
        e.preventDefault();
    
        if (text!== "") {
           
          socket.emit("bmsg", {
            //emitting an event with a payload to send the message to all connected users
            from: username, //state.username
            text: text, //state.message
            to:receiver
          });
    
          setText(""); //resets the message text
        }
      };

return (
    <>
     
    </>
  );
}
{/* <Form inline className="" onSubmit={this.doSearch}>
								<div>
									<FormControl
										
									/>
									<ListGroup className="dropdown-search">
										{this.state.users &&
											this.state.users.map((user) => {
												return (
													<ListGroup.Item className="d-flex  content">
													
													</ListGroup.Item>
												)
											})}
									</ListGroup>
								</div>
							</Form> */
}

export default Chat;