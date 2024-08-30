# News-Stories-Viewer

Here's a sample README file content for your React JS Hacker News Stories Viewer project:

---
## Overview

News Stories Viewer is a React JS web application that fetches and displays the latest articles from the [Hacker News Stories API](https://github.com/HackerNews/API). The application provides a table view of articles with features like periodic updates, error handling, and interactive options for a better user experience.

## Features

- **Fetch Latest Articles**: Retrieves the latest 20 stories from the Hacker News API.
- **Table Display**: Shows articles in a table format with columns for Score, Title, URL, and Author.
- **Loading State**: Displays a spinner while fetching data, ensuring users are aware of ongoing data retrieval.
- **Error Handling**: Graceful handling of API failures and rate-limiting issues with user notifications.
- **Periodic Polling**: Updates the story list every 30 seconds and highlights new stories since the last poll.
- **Pagination**: Implements pagination for navigating through the list of articles.
- **User Interaction**: Allows users to mark stories as "read" or "unread" and filter stories based on their read status.
- **Caching**: Avoids fetching details for previously retrieved stories during the session.
- **Sorting**: Enables sorting of articles by score, title, or author, retaining user preferences.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Rajasekar15/News-Stories-Viewer.git
   cd News-Stories-Viewer
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**

   ```bash
   npm start
   ```

   The application will start on [http://localhost:3000](http://localhost:3000).

## Usage

- On loading, the application will fetch and display the latest 20 stories in a table format.
- The table includes columns for Score, Title, URL, and Author.
- A spinner will be shown while fetching data.
- Stories will be periodically updated every 30 seconds.
- New stories since the last update will be highlighted.
- Use the optional features such as pagination, story read status marking, and sorting based on user preferences.

## Error Handling

- If there is an API failure or rate-limiting issue, a notification will inform the user of the problem.

## Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hacker News API](https://github.com/HackerNews/API) for providing the data.
- [React](https://reactjs.org/) for the framework used to build this application.

---

Feel free to adjust the content to better fit your project specifics or personal style!
