import React, { Component } from 'react'
import {FormControl,InputGroup,Button, ListGroup} from "react-bootstrap"
import {Avatar} from '@material-ui/core';

export default class PostComment extends Component {
    state={
        comments: [],
        newComment: { name: " ", comment: " " },
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
            let response = await fetch(
              "http://localhost:3008/cmnt/" + postId + "/comments",
              {
                method: "GET",
              }
            );
            console.log(response);
            if (response.ok) {
              const data = await response.json();
              this.setState({ comments: data });
             await this.fetchComments()
              console.log(this.state.comments, "fetched Comments");
            }
          } catch (error) {
            console.log(error);
          }
    }
    postComment = async () => {
        let postId = this.props.postId
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.newComment)
        };
        const response = await fetch('http://localhost:3008/cmnt/'+ postId +'/comments', requestOptions);
        await response.json();
        this.setState({ newComment:{ name:"",comment:""} });
    }
    componentDidMount(){
        this.fetchComments(this.props.postId)
    }
    render() {
        return (
            <div>
                <InputGroup className="mt-2">
                <Avatar alt={this.props.user} src={this.props.image} className="mr-1"/>
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
                      <Button variant="outline-secondary" style={{border:"solid #0A66C2 1px" ,backgroundColor:"#0A66C2",color:"white",height:"38px"}}>Post</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <ListGroup>
                        <ListGroup.Item>{this.state.comments.comment}</ListGroup.Item>
                    </ListGroup>
            </div>
        )
    }
}
