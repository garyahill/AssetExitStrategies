import { Question } from "../models";

function GetFaqData(): ReadonlyArray<Question> {
	return [
		{
		  	"Question": "What can I do with this application and how can it help me?",
		  	"Answer": `Asset Exit Strategies is a tool to help you plan and visualize sales of financial assets.
			Using this tool, you can create a laddering exit strategy for as many different assets as you like.
			Additionally, you create and compare multiple strategies for the same asset.`,
		},
		{
		  	"Question": "How is my data stored and is it secure?",
		  	"Answer": `Asset Exit Strategies uses local storage to store the data you enter into the application.
			It does not store any data on remote servers or expose data to any APIs.
			The application does not collect any personal information linked to your identity.`,
		},
		{
		  	"Question": "How do I get started using the application?",
		  	"Answer": `To get started, click the "New Account" link on the login page and enter a username 
			and profile key. Subsequent visits to the site will require you to enter the same username and
			profile key.`,
		},
		{
		  	"Question": "How do I create a new exit strategy?",
			"Answer": `Click the "Add Asset" button under My Scenarios to begin. Enter the asset details and as many 
			exit price levels as you would like.  The application will track the remaining quantity you have left
			to sell.  Click the "Save" button to save your scenario.`,
		},
		{
		  	"Question": "How can I edit or delete an exit strategy?",
			"Answer": `You can edit or delete your scenario by clicking the link to the asset in the left-hand
			navigation.  You can rename the asset, change the quantity, or the method of disposition. To edit
			or remove price levels, use the edit and delete buttons in the "Projected Outcome" table.
			You can add additional price levels by entering the relevant data and clicking the plus button.`,
		},
		{
		  	"Question": "Can I change the order of my assets on the main page?",
		  	"Answer": "Yes, drag and drop your assets on the main page to reorder them as desired.",
		},
		{
		  	"Question": "How can I view the data and charts for my scenarios?",
			"Answer": `You can view the data and charts by clicking on any of your assets on the main page. 
			This will allow you to see your scenario details along with charts to visualize the data.`,
		},
		{
		  	"Question": "Can I view two scenarios side by side?",
		  	"Answer": "This feature is not currently available, but will be a future enhancement.",
		},
		{
			"Question": "Can I view my exit strategies on another computer?",
			"Answer": `To view your exit strategies on another computer, you will need to migrate your data to 
			the new machine. This is slightly technical, but can be achieved by copying your JSON key and value
			for this site from your browser's local storage to the matching domain on your new machine.
			Refer to Google or ChatGPT for more information.`,
		},
		{
			"Question": "I can't remember my username or profile key. What should I do?",
			"Answer": `Since all your data for this application is stored in your browsers local storage, you can 
			find your username and profile key by opening your browser's developer tools and looking at the local
			storage keys for this site.  Refer to Google or ChatGPT for step by step instructions.`,
		},

	  ];
}

export default GetFaqData;