import React from 'react';


const Navigation = ({ onRouteChange,isSignedIn }) => {
		if (isSignedIn) {
			return(
				<nav className="flex justify-end-ns">
					<p 
						onClick={ () => onRouteChange('signout') } 
						className="f3 underline dim black link pa3 pointer"
					>Sign Out</p>
				</nav>
			);
		} else {
			return(
				<nav className="flex justify-end-ns">
					<p 
						onClick={ () => onRouteChange('signin') } 
						className="f3 underline dim black link pa3 pointer"
					>Sign In</p>
					<p 
						onClick={ () => onRouteChange('register') } 
						className="f3 underline dim black link pa3 pointer"
					>Register</p>
				</nav>
			);
		}	
};

export default Navigation;