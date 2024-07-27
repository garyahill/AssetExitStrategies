import React from "react";
import "./InfoTooltip.less";


interface InfoTooltipProps {
	tooltipText: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ tooltipText }) => {
	return (
		<div className="tooltip">
			<span className="info-icon">ℹ️</span>
			<div className="tooltiptext" >
				{tooltipText}
			</div>
		</div>
	);
};

export default InfoTooltip;
