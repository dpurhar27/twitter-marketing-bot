# Twitter Marketing Bot

This bot retrieves the followers of target user and tweets them. 

Use Case: Input competitors or similar companies in your niche to target and attract new customers to your product and company. The bot tracks users you've tweeted before to make sure you don't tweet the same user twice. The key is followers of these accounts are in your target market and are interested in the services you offer. Prove to them in 280 tweets and images why you're better then your competitors. 

Improvements: Customize tweets per user. Randomly swap in synonyms for words, change sentence structures, attach different images of your product. Randomly generate a wait time between each tweet. 

Disclaimer: I'm not responsible for anything you do with this bot or any repercussions from using the bot. Please don't use this as a spam bot. 

---

## How to use
* Download or fork this repository
* Run `npm install` to install the needed dependencies
* Open 'unlockAccount.js' and then change its values appropriately to your own. This file will unlock the Twitter API for your Twitter account. 
* Visit the [Twitter API](https://apps.twitter.com/app/new) and fill out the form. When done, click on the _Keys and Access Tokens_ tab to view your consumer key/secret and access token key/secret. Copy these keys/secrets into your `unlockAccount.js` file.
* Open 'index.js' and fill in the parameters for the target user (companies in your niche) and your tweet content.
* Now you're ready! Open up the command prompt to this project's directory and type `npm start` to run the bot.

### Credit

This project was based off a tutorial written by Brandon Morelli.

Check out his Twitter bot here: "https://github.com/bmorelli25/Twitter-Bot#readme" that returns 10 tweets for a specified search query then favorites each of the returned tweets.