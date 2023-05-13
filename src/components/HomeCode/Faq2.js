import React from 'react'
import "./Faq.css"
import Footer from './Footer'

function Faq2({faq, index, toggleFAQ}) {
	return (
		<div
			className={"faq " + (faq.open ? 'open' : '')}
			key={index}
			onClick={() => toggleFAQ(index)}
		>
			<div className="faq-question">
				{faq.question}
			</div>
			<div className="faq-answer">
				{faq.answer}
			</div>
            
		</div>
	)
}

export default Faq2
