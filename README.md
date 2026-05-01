# CivicGuide: Interactive Election Assistant

## Description
CivicGuide is an interactive and accessible digital assistant designed to guide users through the electoral process. It features a user-friendly interface that simplifies complex civic information such as voter registration, election timelines, and participation requirements. The assistant remains strictly non-partisan, offering clear, step-by-step guidance to encourage informed voter participation.

## Features
- **Interactive Timeline**: A step-by-step visual guide outlining the electoral process from registration to Election Day.
- **Simulated Chat Assistant**: An interactive chatbot that provides immediate answers to common questions regarding the election process, such as registration requirements, primary vs. general elections, and voter ID laws.
- **Responsive Design**: A modern, mobile-friendly interface built with a rich aesthetic and dynamic micro-animations.
- **Non-Partisan Information**: Strictly educational content designed to empower voters.

## Technologies Used
- HTML5
- Vanilla CSS3 (Custom styling, animations, and responsive layout)
- Vanilla JavaScript (DOM manipulation, timeline logic, and chat simulation)

## How to Run Locally

Since this is a static web application, running it is very straightforward:

1. **Directly in Browser**: 
   Simply double-click the `index.html` file to open it in your default web browser.

2. **Using a Local Development Server** (Recommended for best experience):
   If you have Node.js installed, you can serve the project using a simple HTTP server.
   
   Using `npx` and `serve`:
   ```bash
   npx serve .
   ```
   
   Or using Python's built-in server:
   ```bash
   python -m http.server 3000
   ```
   Then navigate to `http://localhost:3000` in your browser.

## Project Structure
- `index.html`: The main HTML document containing the structure of the web app.
- `index.css`: The styling file containing the custom design system and responsive rules.
- `app.js`: The logic file handling the interactive timeline and the simulated chat assistant.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or additional features. Ensure that all added information remains strictly non-partisan and factual.

## License
MIT License
