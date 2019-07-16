import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange,onButtonChange }) => {
	return(
		<div className="">
		  <p className="f3">
		  	{'This Magic will detect faces in your picture. Git it a try!'}
		  </p>
		  <div className="pa4 form center br3 shadow-5">	    
		    <input 
			    id="name" 
			    className="f4 pa2 w-70" 
			    type="text"
			    onChange = {onInputChange} 
		    />
		    <button 
		    	className="dib grow pointer w-30 ph3 pv2 white bg-light-purple"
		    	onClick={onButtonChange}
	    	>Detect

	    	</button>
		  </div>
		</div>
	);
	
};

export default ImageLinkForm;