import React from "react"
import "../css/EvgeniSecond.css"
import { GrUserAdd } from "react-icons/gr"
import { RiVipDiamondFill } from "react-icons/ri"
import { RiFlag2Fill } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import { Col, Row, Container, Image } from "react-bootstrap"
import { me } from "../fetch"

class LeftSideBarNewsPage extends React.Component {
	state = {
		myObject: {},
	}
	fetchMe = async () => {
		/*try {
			let response = await fetch(
				`https://striveschool-api.herokuapp.com/api/profile/me`,
				{
					method: "GET",
					headers: new Headers({
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0Y2MwNGVkMjY2ODAwMTcwZWEzZTEiLCJpYXQiOjE2MDY3MzI4MDQsImV4cCI6MTYwNzk0MjQwNH0.5SXRMRe0ODrHgIQD_X5IjaBng7GYCNd_FeZthitZ8bs",
					}),
				}
			)*/
		let parsedResponse = await me()
		this.setState({ myObject: parsedResponse })
		console.log(parsedResponse)
		/*} catch (e) {
			console.log("ERROR fetching" + e)
		}*/
	}
	componentDidMount = () => {
		console.log()
		this.fetchMe()
	}

	render() {
		return (
			<>
				<Container className="firstContainer font">
					<Row className="coverImageRow">
						<Image
							className="coverPhoto"
							fluid
							src="data:image/png;base64,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"
						/>
					</Row>
					<Row className="profilePicRow">
						<Image
							className="profilePic border-2 border-white"
							fluid
							src={this.state.myObject.image}
							roundedCircle
						/>
					</Row>
					<Row className="userNameRow text-center">
						<Col>{this.state.myObject.name + " " +this.state.myObject.surname}</Col>
					</Row>
					<Row className="bioRow">
						<Col>{this.state.myObject.bio}</Col>
					</Row>
					<Row>
						<Col sm={9} xs={9}>
							<Row className="connections">Connections</Row>
							<Row className="grow">Grow your network</Row>
						</Col>
						<Col sm={3} xs={3}>
							{" "}
							<GrUserAdd className="addUser icons0" />
						</Col>
					</Row>
					<Row className="access">Acces exclusive tools {"&"} insights </Row>
					<Row className="premiumRow">
						<Col sm={2} xs={2}>
							<RiVipDiamondFill className="premiumIcon "  />
						</Col>
						<Col sm={10} xs={10} className="premiumText">
							Reactivate Premium
						</Col>
					</Row>
					<Row>
						<Col sm={2} xs={2}>
							{" "}
							<RiFlag2Fill className="dirtyFlag" />
						</Col>
						<Col sm={10} xs={10} className="savedText">
							{" "}
							Saved Items{" "}
						</Col>
					</Row>
				</Container>

				<Container className="secondContainer ">
					<Row className="groups ">
						<a href="/" >Groups</a>
					</Row>
					<Row className="events">
						<Col sm={8} xs={6}>
							<a href="/" className="font12 text-muted ">Events</a>
						</Col>
						<Col sm={4} xs={6}>
							<AiOutlinePlus className="plus" />
						</Col>
					</Row>
					<Row className="hashTag">
					<Col sm={8} xs={6}>
						<a href="/" className="hashTagText" className= "text-muted font12">
							Followed Hashtag
						</a>
						</Col>
					</Row>
					<div className="discoverMe">
						<p
						
							className="discoverText font14"
						>
							
							Discover Me
						</p>
					</div>
				</Container>
			</>
		)
	}
}

export default LeftSideBarNewsPage
