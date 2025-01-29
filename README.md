# TV Program 2.0

## About
This is a simple tv-program app, created to quickly find out what is on TV right now and what was during the last 10 days. 
It filters TV programs and keeps only Movies and Cartoons (removing all other programs, like 'news', "talk shows" etc...).

It's designed to be used with smart TV programs, such as Kyivstar TV, Megogo, etc., where you can watch shows on record. 
Also, it supports Google searches, so you can quickly find what you want on the Internet with one click.

This website uses PWA technology so that you can install the APP on your mobile.
* Open the website on your mobile
* On IOS (Safari only)
  * "Share"
  * "Add to Home screen"
* On Android
  * "More" or 3 dots
  * "Add to Home screen"

### Programs filtering
![Part1](https://github.com/user-attachments/assets/667fed19-f8b2-4a97-ba6d-ec05586519d7)

### Search with Google in one click
![Part2](https://github.com/user-attachments/assets/071e0193-243b-432c-9e1f-6b5cfa80da0e)

## Additional info
The project is deployed on Vercel

Production link: https://tv-pr.vercel.app/

## Used technologies:
* Typescript (Frontend, Server, and API - SLS functions)
* SCSS (modular system)
* Docker (API and FE containers)
* PostgreSQL (for local and production databases)
  
## How to run the app locally
### Prerequisites:
* Installed docker

### Steps:
* Open the root folder
  * Open a new terminal window
  * Run the command `make api` - to run API container

* When the API server is up:
  * open a new terminal window
  * run: `make fe` - to run Frontend container
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser
