import React, { useState, useEffect, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup} from "react-bootstrap"
import io from "socket.io-client";




const connOpt = {
    transports: ["websocket"], // socket connectin options
  };
  let socket = io("https://striveschool.herokuapp.com/", connOpt); //socket instance

function Chat() {
    const [username, setUsername] = useState("hilal");
    const [list, setList] = useState([]);
    const [receiver, setReceiver] = useState("");

    const [text, setText] = useState("");
    const [allMyMessages, setallMyMessages] = useState("");
    

    useEffect(() => {
        socket.on("chatmessage", (msg) => setText((text) => text.concat(msg)));
        socket.on("connect", () => console.log("connected to socket")); //check if socket is connected
        socket.on("list", (list) => setList(list));
        socket.emit("setUsername", (username) => setUsername(username));
        console.log("list",list)
 
        return () => socket.removeAllListeners(); //componentWillUnmount
      }, []);



    //   const getList = useCallback(async () => {
    //   let response= await fetch("https://striveschool-api.herokuapp.com")
    //   let list = await response.json()
    //   setList(list)
    //   console.log("list",list)
    //   }, []);



    //   useEffect(getList, [getList]);

      const getPastMessages = async () => {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/messages/" + username
        );
        let messages = await response.json();
        console.log(messages);
         setallMyMessages((msg) => msg.concat(messages));
      };

      const sendMessage = (e) => {
        e.preventDefault();
    
        if (text!== "") {
           
          socket.emit("chatmessage", {
            //emitting an event with a payload to send the message to a specific user
            from: username, //state.username
            text: text, //state.text
            to:receiver
            
          });

          setText(""); //resets the message text
        }
      };

return (
    <>
     {/* <ListGroup >
										{list &&
											list.map((user) => {
												return (
													<ListGroup.Item className="d-flex  content">
													{user}
													</ListGroup.Item>
												)
											})}
									</ListGroup> */}
    </>
  );
}
{/* <Form inline className="" onSubmit={}>
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