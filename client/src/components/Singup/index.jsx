import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from '../Login/GoogleAuth';
import './Signup.css'
import gifImage from '../../video/Nasaastronaut.gif';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Use env variable if set, otherwise detect environment
			const getApiUrl = () => {
				if (process.env.REACT_APP_API_URL) {
					return process.env.REACT_APP_API_URL;
				}
				// Check if running in production (Vercel)
				if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
					return 'https://nasa-apodapi-webapp-lyart.vercel.app';
				}
				return 'http://localhost:8080';
			};
			const url = getApiUrl();
			const { data: res } = await axios.post(`${url}/api/users`, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		
		<div className="background-container">
			
			<div className="content-container">	
				<div className="image-description">
					<img src={gifImage} alt="Animated GIF" className="gif-image" />
					<p className="description">
					<a href="https://api.nasa.gov/">
					NASA Astronomy Picture of the Day API (APOD)</a> showcases captivating images of the universe.
            		Each day, a new photograph or video is featured, capturing astronomical wonders such as galaxies, nebulas, and planets. 
            		With informative descriptions, APOD offers a daily dose of cosmic exploration, inspiring awe and fostering a deeper 
            		appreciation for the vastness of space.
					</p>
				</div>	
				<div className="signup-section">
					<form className="signup-form" onSubmit={handleSubmit}>
						<h1 className="signup-heading" >Create an account</h1>
						
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="signup-form-fname"
						/>
						
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="signup-form-lname"
						/>
						
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="signup-form-email"
						/>
						
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="signup-form-password"
						/>
						
						{error && <div className="signup-form-password-error">{error}</div>}
						
						<button className="signup-form-button" type="submit">
							Sign Up
						</button>
						</form>
				
				<div className="login-section">
					<Link  to="/login">
							
						<h4 className="signup-to-login">Already have an account? Login</h4>
							
					</Link>
					<p className="or">OR</p>
					<div className="google-auth-container">
						<GoogleAuth />
					</div>
			    	</div>
				
				</div>
			</div>
		</div>
	);
};

export default Signup;

