// import React, { Component } from "react";
// import { Jumbotron } from "../components/Sections";
// import { Input, FormBtn } from "../components/Form";
// import { AuthConsumer } from "../components/AuthContext"

// class Login extends Component {

//   // Definining State to Hold Info
//   state = {
//     email: "dm@gmail.com",
//     password: "dansirdan"
//   }

//   // Method to call Auth Login function
//   handleLogin = (login, e) => {
//     e.preventDefault();
//     login(this.state)
//   }

//   // Handles state change for inputs
//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   render() {
//     return (
//       <div className="container">
//         <AuthConsumer>
//           {({ login }) => (

//             <Jumbotron>
//               <h5>Login Below:</h5>
//               <form>
//                 <Input
//                   value={this.state.email}
//                   onChange={this.handleInputChange}
//                   name="email"
//                   placeholder="Email (required)"
//                 />
//                 <Input
//                   value={this.state.password}
//                   onChange={this.handleInputChange}
//                   name="password"
//                   placeholder="Password (required)"
//                 />
//                 <FormBtn
//                   disabled={!(this.state.email && this.state.password)}
//                   onClick={(e) => this.handleLogin(login, e)}
//                 >
//                   Login
//                 </FormBtn>
//               </form>

//             </Jumbotron >
//           )}
//         </AuthConsumer>
//       </div >
//     )
//   }
// }

// export default Login;
