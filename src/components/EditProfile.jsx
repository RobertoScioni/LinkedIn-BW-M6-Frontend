import React from "react"

import { Modal, Button, Form, Col, Image, Spinner } from "react-bootstrap"
import { me } from "../fetch"

class EditProfile extends React.Component {
	state = {
		profile: {
			
                name:"",
                surname:"",
                bio:"",
                title:"",
                area:"",
                
        },
        readOnly:{
            email:"",
            username:"",

        },
		formData: null,

		profile: {},
		errMessage: "",
		loading: false,
    }
   
	// myId = async () => {
	// 	let id = await me()
	// 	id = id._id
	// 	this.setState({ id })
	// }
	//It passes false as showMode to parent body. It means dont show Modal.
	handleClosePF = () => this.props.handleClosePF(false)

	updateField = (e) => {
        let currentid = e.currentTarget.id
		let profile= { ...this.state.profile}
		profile[currentid] = e.currentTarget.value 

		this.setState({ profile:profile })
	}

	EditFetch = async () => {
		let TOKEN = process.env.REACT_APP_TOKEN
		let response

		try {
			
				const url = `${process.env.REACT_APP_URL}profile/${this.props.uid}`
				response = await fetch(url, {
					method: "PUT",
					body: JSON.stringify(this.state.profile),
					headers: new Headers({
						"Content-Type": "application/json",

						Authorization: `Bearer ${TOKEN}`,
					}),
				})
			
			console.log("RESPONSE", response)
			if (response.ok) {
				let res = await response.json()
				console.log("res of edit ", res)

				this.setState({
					profile: {
			
                        name:"",
                        surname:"",
                        bio:"",
                        title:"",
                        area:"",
                   
                },
					errMessage: "",
				})
				this.handleClosePF()
				return res
			} else {
				console.log("an error occurred")
				let error = await response.json()
				this.setState({
					errMessage: error.message,
					loading: false,
				})
			}
		} catch (e) {
			console.log(e) // Error
			this.setState({
				errMessage: e.message,
				loading: false,
			})
		}
	}

	getFetch = async () => {
		let TOKEN = process.env.REACT_APP_TOKEN

		try {
			//${process.env.REACT_APP_URL}profile//profile
			const url = `${process.env.REACT_APP_URL}profile/${this.props.uid}`
			let response = await fetch(url , {
				method: "GET",
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			})
			if (response.ok) {
				let profile = await response.json()
				console.log("profile:", profile)

				this.setState({
                    profile: {
			
                        name:profile.name,
                        surname:profile.surname,
                        bio:profile.bio,
                        title:profile.title,
                        area:profile.area,
                        
                },
                 readOnly:{
                     username:profile.username,
                     email:profile.email

                 },

					errMessage: "",
					
				})
			}
		} catch (e) {
			console.log(e)
		}
	}

	
	
	submitForm = (e) => {
		e.preventDefault()
		this.setState({ loading: true })
	this.EditFetch()
	}


	componentDidMount = async () => {
	
			this.getFetch()
	
	}

	render() {
		const { showPF } = this.props
		return (
			<>
				<Modal show={showPF} onHide={this.handleClosePF}>
					<Modal.Header closeButton>
						<Modal.Title>
							
								<p>Edit Profile</p>
						
							
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.submitForm}>
                        <Form.Row>
								<Form.Group as={Col}>
									<Form.Label htmlFor="name">Name *</Form.Label>
									<Form.Control
										type="text"
										name="name"
										id="name"
										placeholder="name"
										value={this.state.profile.name}
										onChange={this.updateField}
										required
									></Form.Control>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label htmlFor="surname">Surname*</Form.Label>
									
										<Form.Control
											type="text"
											name="surname"
											id="surname"
											placeholder=" surname"
											value={this.state.profile.surname}
											onChange={this.updateField}
											required
										></Form.Control>
									
								</Form.Group>
							</Form.Row>
							<Form.Group>
								<Form.Label>E-mail</Form.Label>

								<Form.Control
									id="email"
									type="text"
									value={this.state.readOnly.email}
									placeholder="Ex: johnDoe@gmail.com"
									readOnly
								/>
                                <Form.Label htmlFor="email">
									
                                    You can your change your  e-mail adress in Account Settings.
								</Form.Label>
							</Form.Group>

							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									id="title"
									type="text"
									value={this.state.profile.title}
									onChange={this.updateField}
									placeholder="Ex: CFO"
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control
									id="area"
									type="text"
									value={this.state.profile.area}
									onChange={this.updateField}
									placeholder="Ex: İstanbul /Turkey"
								
								/>
							</Form.Group>

						
					
							<Form.Group>
								<Form.Label htmlFor="bio">BIO</Form.Label>
								<Form.Control
									as="textarea"
									name="bio"
									id="bio"
									placeholder="bio"
									value={this.state.profile.bio}
									onChange={this.updateField}
								
								/>
							</Form.Group>
                            <Form.Group>
								<Form.Label>User Name</Form.Label>

								<Form.Control
									id="username"
									type="text"
									value={this.state.readOnly.username}
									readOnly
								/>
							</Form.Group>
                            <Form.Label htmlFor="username">
									Username is unique and the same as your e-mail. You should go to Account Settings.
								</Form.Label>
							<Form.Group className="d-flex px-3">
								
								<Button
									className="saveBtn ml-auto"
									variant="primary"
									type="submit"
								>
									{" "}
									{this.state.loading && (
										<Spinner animation="border" variant="warning" />
									)}{" "}
									Save
								</Button>
							</Form.Group>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}
export default EditProfile
