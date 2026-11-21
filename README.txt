STUDYBUDDY — ANDROID STARTER APP

What is included
- Mobile-first homework planner with locally saved tasks.
- AI helper that creates a detailed prompt for ChatGPT.
- Installable PWA setup (manifest + service worker).
- No account, paid API, or API key required for this starter version.

IMPORTANT LIMITATION
This is a working starter/prototype, not a native Play Store app and not an embedded AI engine.
The helper prepares a prompt and opens ChatGPT; you choose to send the prompt there.
An actual in-app AI feature requires connecting a secure backend to an AI provider.
Never put a private API key in browser JavaScript.

HOW TO PUT IT ON YOUR ANDROID PHONE
A PWA must be served from an HTTPS website to install reliably. Easiest route:
1. Create a GitHub account (if needed) and a new public repository named studybuddy.
2. Upload all files in this folder to the repository root.
3. In repository Settings > Pages, choose deploy from the main branch and root folder.
4. Wait for the Pages URL to appear.
5. Open that HTTPS URL in Chrome on Android.
6. Tap Chrome menu (three dots) > Install app or Add to Home screen.

You can also use another HTTPS static host. Do not upload private homework or personal information into a public repository.

HOW TO USE
- Planner tab: add tasks, subject and due date; tick completed or delete.
- AI helper tab: paste a question, choose the kind of help, create prompt, copy it, then open ChatGPT and paste.
- Tasks stay in this browser's local storage. Clearing browser data can erase them.

NEXT DEVELOPMENT STEP
For true automatic AI responses inside the app, add a small server endpoint that securely calls an AI API. Keep API keys on the server, not in app.js. Add photo/PDF upload only with clear user consent and secure file handling.
