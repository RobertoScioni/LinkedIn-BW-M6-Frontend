import React, { Component } from 'react'
import {FormControl,InputGroup,Button, Row, Col,ListGroup} from "react-bootstrap"
import {Avatar} from '@material-ui/core';
import { me } from "../fetch"

export default class PostComment extends Component {
    state={
        comments: [],
        newComment: { 
            name: {}, 
            comment: " " },
        currentUser:[]
    }
    fetchMe = async () => {
        let response = await me()
        this.setState({newComment:{
            ...this.state.newComment,
            name: response
        },currentUser:response})
    }
    changeHandler = (e) => {
        this.setState({
          newComment: {
            ...this.state.newComment,
            [e.target.id]: e.target.value,
          },
        });
      };
    fetchComments = async (postId) => {
        try {
            console.log("FETCHING")
            let response = await fetch(
              "http://localhost:3008/cmnt/" + postId,
              {
                method: "GET",
              }
            );
            console.log(response);
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              this.setState({ comments: data });
             //await this.fetchComments()
              console.log(this.state.comments, "fetched Comments");
            }
          } catch (error) {
            console.log(error);
          }
    }
    postComment = async () => {
        try {
            let postId = this.props.postId
            let response = await fetch("http://localhost:3008/cmnt/" + postId,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.newComment),
              });
              console.log(response)
            if (response.ok) {
                await response.json()
                this.fetchComments(postId)
                this.setState({newComment: {name:"",comment:""}})
            } else {
                console.log("something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount(){
        this.fetchMe()
        this.fetchComments(this.props.postId)
        console.log("component MOUNTED")
      console.log(this.props.postId)
  }
    render() {
        const { currentUser } = this.state;
        console.log(this.state.currentUser,"current user")
        console.log(this.state.newComment.name, "current user")
        console.log(this.state.comments, "comments")
        return (
            <div>
                <InputGroup className="mt-2">
                <Avatar alt={this.props.user} src={this.state.currentUser.image} className="mr-1"/>
                    <FormControl
                    onChange={(e) => this.changeHandler(e)}
                    id={"comment"}
                    required
                      value={this.state.newComment.comment}  
                      placeholder="Add a comment..."
                      aria-label="Add a comment..."
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={this.postComment} style={{border:"solid #0A66C2 1px" ,backgroundColor:"#0A66C2",color:"white",height:"38px"}}>Post</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <ListGroup className="mt-2">
                  {
                      this.state.comments.reverse().map(comment => 
                        <ListGroup.Item style={{border:"none"}}>
                            <Row>
                                <Col lg={1}>
                                <Avatar alt={comment.name.name, comment.name.surname} src={comment.name.image}/></Col>
                                <Col style={{marginLeft:"30px",display:"grid", borderRadius:"4px",height:"60px",backgroundColor:"#F2F2F2"}}><strong>{comment.name.name} {comment.name.surname}</strong>
                                {comment.comment}
                                </Col>
                            </Row>
                            </ListGroup.Item>
                      )
                  }
                </ListGroup> 
            </div>
        )
    }
}
