import React from "react";
import {
  Card,
  Image,
  Container,
  Button,
  Row,
  Accordion,
} from "react-bootstrap";
import { GoPencil, GoTrash } from "react-icons/go";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import KeyboardReturnRoundedIcon from "@material-ui/icons/KeyboardReturnRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import Moment from "react-moment";
import "../css/Hilal.css";
import PostComment from "./PostComment"
class NewsFeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.post;
    this.state.mine = this.props.mine;
  }

  deleteMe = async (id) => {
    console.log(
      "enter delete mode for post",
      this.state.id,
      "or, maybe, for",
      id
    );
    try {
      let TOKEN = process.env.REACT_APP_TOKEN;
      let response = await fetch(`${process.env.REACT_APP_URL}posts/` + id, {
        method: "DELETE",
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        }),
      });
      console.log("the server responded", response);
      this.props.refresh();
    } catch (err) {
      console.error(err);
      this.props.refresh();
    }
  };

  componentDidMount = async () => {
    //this.getImgs()
    console.log("got an image?", this.state.imageUrl);
  };
  render() {
    return (
      <Card className="cardsin">
        <Card.Body className="d-flex flex-column">
          <Row>
            <div style={{ marginLeft: "17px" }}>
              <Image
                src={this.state.user.image}
                className="miniProfilePic"
                roundedCircle
              />
            </div>
            <div style={{ marginLeft: "5px" }}>
              <b>
                {this.state.user.name} {this.state.user.surname}
              </b>

              <p
                style={{
                  padding: "0px",
                  marginBottom: "0px",
                  fontSize: "12px",
                }}
                className="text-muted"
              >
                {this.state.user.title}
              </p>
              <span
                className="font12 text-muted "
                style={{ padding: "0px", fontSize: "12px" }}
              >
                <Moment fromNow>{this.props.post.createdAt}</Moment> •{" "}
                <PublicRoundedIcon style={{ fontSize: "1rem" }} />
              </span>
              <div className="myHr w-100  my-1" />
            </div>
          </Row>
          <Container className="d-flex flex-row imageWrap">
            <span className="flex-fill d-inline-block myWrap">
              {this.state.text}

              {this.state.imageUrl && (
                <Image
                  className="border-0"
                  src={this.state.imageUrl}
                  thumbnail
                />
              )}
            </span>
            {this.state.mine && (
              <>
                <GoPencil
                  className="icons mx-1"
                  onClick={() =>
                    this.props.edit({
                      text: this.state.text,
                      id: this.state._id,
                    })
                  }
                />
                <GoTrash
                  className="icons"
                  onClick={() => this.deleteMe(this.state._id)}
                />
              </>
            )}
          </Container>
          <div className="myHr w-100 my-1" />
          <Container className=" d-flex flex-row-reverse border-top">
            <Card.Body
              className="postReactions"
              style={{
                marginLeft: "-27px",
                marginBottom: "-30px",
                marginTop: "2px",
              }}
            >
              <Accordion>
                <Accordion.Toggle eventKey="0">
                  <button>
                    <ThumbUpAltOutlinedIcon /> Like
                  </button>
                  <SmsOutlinedIcon /> Comment
                  <button>
                    <KeyboardReturnRoundedIcon /> Share
                  </button>
                  <button>
                    <SendRoundedIcon /> Send
                  </button>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
				  <PostComment 
				  image={this.state.user.image}
				  postId={this.props.post._id}
				  user={this.state.user.name && this.state.user.surname}/>
                </Accordion.Collapse>
              </Accordion>
            </Card.Body>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default NewsFeedPost;
