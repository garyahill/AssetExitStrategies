import React from "react";
import "./InfoTooltip.less";


interface InfoTooltipProps {
	tooltipText: string;
	tooltipWidth?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ tooltipText, tooltipWidth = "150px" }) => {
	return (
		<div className="tooltip">
			<span className="info-icon">ℹ️</span>
			<div className="tooltiptext" style={{ width: tooltipWidth }}>
				{tooltipText}
			</div>
		</div>
	);
};

export default InfoTooltip;
