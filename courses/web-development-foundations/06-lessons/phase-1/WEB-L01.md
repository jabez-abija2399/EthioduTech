# WEB-L01: How the Web Works

## 1. Context & Goal
Before writing code for the web, you need to understand the physical and logical architecture of the internet. If you don't understand how data travels from a database in California to a screen in Tokyo, you will not be able to diagnose bugs when your website inevitably breaks.

**By the end of this lesson, you will be able to:**
Trace the lifecycle of a web request and explain the roles of the Client, Server, IP Address, and DNS.

## 2. Retrieval Practice
In the previous phase, you used a "local HTTP server". What did it do? Why didn't you just double-click the file to open it in Chrome?

## 3. Concept: Clients and Servers
The web is essentially millions of computers talking to each other. They fall into two categories:
* **Clients:** The typical web user's internet-connected devices (e.g., your computer, your phone) and web-accessing software (usually a browser like Chrome or Safari).
* **Servers:** Computers that store webpages, sites, or apps. When a client device wants to access a webpage, a copy of the webpage is downloaded from the server onto the client machine to be displayed in the user's web browser.

## 4. Concept: IP Addresses and DNS
How does the client know where the server is? 
Every computer on the internet has an **IP Address** (like `192.168.1.1`). It's like a phone number. 

But humans are bad at remembering numbers. We prefer names like `google.com`. 
The **Domain Name System (DNS)** is the internet's address book. It translates human-readable domain names into IP addresses.

## 5. Worked Example: The Request/Response Cycle
What actually happens when you type `google.com` and press Enter?
1. **The Request:** Your browser (Client) asks the DNS for Google's IP address.
2. **The Connection:** Your browser sends an HTTP Request to that IP address (the Server).
3. **The Response:** The Server approves the request and sends a "200 OK" message, followed by the files (HTML, CSS, JS).
4. **The Render:** Your browser receives the files and paints the pixels on your screen.

## 6. Independent Practice
> **EX-WEB-01:** Imagine you are at a restaurant. Map the web request cycle to the restaurant experience.
> * Who is the Client?
> * What is the HTTP Request?
> * Who is the Server?
> * What is the HTTP Response?

## 7. Debugging / Transfer Task
Your home Wi-Fi is connected, but when you type `netflix.com`, your browser says `DNS_PROBE_FINISHED_NXDOMAIN`. However, if you type Netflix's raw IP address (`54.237.226.164`) directly into the address bar, the site loads!

Where is the failure happening in the Request/Response cycle? Is Netflix's server down, or is something else broken?

## 8. Reflection
Why is it called a "request/response" cycle? Can a server just send a webpage to a client without the client asking for it first?

## 9. Mastery Check
Can you correctly order these events?
A) The server sends the HTML file back over the internet.
B) The browser reads the HTML and renders the text on your screen.
C) The browser asks the DNS for the IP address of the domain.
D) You type a URL and hit Enter.
