Sure! Here's a GitHub README template you can use for the project:

```markdown
# Yu-Gi-Oh! Card Image Downloader

This is a Node.js script that downloads Yu-Gi-Oh! card images from the YGOPRODeck API. The script fetches the card data and downloads images to a specified folder. It supports concurrent downloads and caching to avoid downloading the same image multiple times.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (includes npm)
  
## Installation

1. **Clone the Repository** (or create a directory for your script):
   ```bash
   git clone https://github.com/your-username/yugioh-image-downloader.git
   cd yugioh-image-downloader
   ```

2. **Install Dependencies**:
   Install the required `image-downloader` package using npm:
   ```bash
   npm install image-downloader
   ```

## Usage

1. **Edit the Script (Optional)**:
   - The script is set to download images into a folder named `cards` two levels up from the script's location. If you want to change this to the current directory, update this line in the `downloadImages.js` file:
     ```javascript
     const folder = path.resolve(__dirname, 'cards');
     ```
   - You can also modify the `concurrency` value to control how many images are downloaded in parallel:
     ```javascript
     const concurrency = 18; // Number of parallel downloads
     ```

2. **Run the Script**:
   Run the script using Node.js:
   ```bash
   node downloadImages.js
   ```

3. **Monitor the Output**:
   As the script runs, it will display logs for each downloaded image:
   ```bash
   Downloaded: /path/to/cards/image.jpg
   Skipped (already exists): /path/to/cards/image.jpg
   ```

4. **Check the Downloaded Images**:
   All images will be saved in the `cards` folder. If it doesn't exist, the script will create it automatically.

## Troubleshooting

- If you encounter issues with the API or rate-limiting, consider reducing the concurrency to a lower value (e.g., 5).
- Errors during image downloads will be logged, but the script will continue processing the remaining cards.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

### API Source

This script uses the YGOPRODeck API to fetch Yu-Gi-Oh! card information. You can learn more about the API [here](https://ygoprodeck.com/api-guide/).

## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to the project!

```

### Steps:
1. Replace `your-username` in the clone URL with your actual GitHub username.
2. If you want to add a license (e.g., MIT License), make sure to include the appropriate LICENSE file.
3. You can also adjust the instructions based on any specific setup or requirements for your repository.

This README provides an easy-to-follow guide for users to install and run your script!
