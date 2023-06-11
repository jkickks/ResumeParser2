# ResumeParser


1. Run `git clone https://github.com/faizancodes/ResumeParser.git`
2. Run `cd ResumeParser`
3. Run the command: `npm init -y`
4. Run the command `npm install`
5. Make an account on https://firebase.google.com/
6. Within Firestore, make a collection called 'resumes'
7. Then, go to project settings -> service accounts, and then generate a new private key
8. Rename the json file to serviceAccountKey.json and place it within the same project folder 
9. Run the command `node server.js`
10. Go to http://localhost:3000/ and right click, open inspect element, and then go to the console tab
11. Upload a resume, you should see the extracted text in the console
12. Check Firestore to see if the text in the resume got saved there
