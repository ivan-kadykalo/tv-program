# TV Program 2.0

## About
This is a simple tv-program app, created to quickly find out what is on TV right now. It's filtering TV programs and keeping only Movies and Cartoons (removing all other programs, like 'news', "talk shows" etc...).

It's created to use along with smart tv programs, like Kyivstar TV, Megogo, etc. where you watch shows in record. 
Also it's support a google search, so you can quickly find what you want in the internet by one click.

### Programs filtering
![Part1](https://github.com/user-attachments/assets/667fed19-f8b2-4a97-ba6d-ec05586519d7)

### Search with Google in one click
![Part2](https://github.com/user-attachments/assets/071e0193-243b-432c-9e1f-6b5cfa80da0e)

## How to run the app locally
### Prerequisites:
* Installed docker

### Steps:
* Open the root folder
  * Open new terminal window
  * Run command `make api` - to run DB and API containers

* When API server is up:
  * open new terminal window
  * run: `make fe` - to run Frontend container
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser
