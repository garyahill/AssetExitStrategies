import React from "react";
import GetFaqData  from "../../../data/faqData"
import "./faqList.less";

const FaqList: React.FC = () => {
	return (
		<div className="faq-container">
			{GetFaqData().map((question, index) => (
				<div key={index} className="faq-item">
					<h4>{question.Question}</h4>
					<p>{question.Answer}</p>
				</div>
			))}
		</div>
	);
};

export default FaqList;