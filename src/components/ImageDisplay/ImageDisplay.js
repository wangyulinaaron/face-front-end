import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ imageUrl, box}) => {
	return(
		<div className="center">
		<div className=" ma4  absolute">
			<img id="inputimage" src={imageUrl} alt="" width='500px' height='auto'/>
			<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
		</div>
		</div>
	);
	
};

export default ImageDisplay;