const Twitter = require('twitter');
const unlockAccount = require('./unlockAccount.js'); // Load the file to access your Twitter account.
const client = new Twitter(unlockAccount); // Create a Twitter API client using your accoutn.
const fs = require('fs');
const readFile = fs.readFileSync('../txt/tweetedToUsers.txt'); // Read in the file that holds user's you have already tweeted at.
const alreadyTweeted = readFile.toString().split(","); // Use ',' as the delimiter to split the different user's screen_names.
let userNames = [ ]; // Hold the screen_names of the tweeted users.
let dataNames = [ ]; // Store the user_ids of the user's you want to target.

// Function to tweet users.
// Beware of hoisting with ES6 syntax and not using the 'function' keyword. This must be declared in the document BEFORE you attempt to use it.
const tweetUser = (i, loop) => {

    // Indicates to the Twitter API GET call which user's screen_name you want to retrieve.
    const userID = {
        user_id : dataNames[i]
    }

    client.get('users/show', userID, (err, datas, response) => {
        if(err) {
            console.log('Something went wrong while getting user screen_names...')
            return console.log(err);
        } else {
            userNames.push(datas.screen_name);
            fs.writeFile("../txt/tweetedToUsers.txt", userNames, (err) => {
                if(err) {
                console.log('Something went wrong while writing to the user tracker file...')
                return console.log(err);
                }
                console.log("The file of already tweeted users has been updated!");
            });

              if(!(alreadyTweeted.includes(datas.screen_name))) { // Check if you've already tweeted at this user. If you haven't, then go ahead. Else continue to the next user.

                  // Let's construct the tweet.
                  // Attributes:
                  //            status : The tweet you want to send
                  //            media_ids (optional) : The media id string of the photo you want to attach
                  const tweet = {
                      status: 'Hey @'+ datas.screen_name + ', rest of message ....', // Improvement: Customize user messages with M.L. beforehand. Easier: Swap out synonyms randomly, sentence ordering and structure.
                      media_ids: 'optionally add a photo for better conversions' // Example: '23572038523'
                    }

                // Post the tweet to Twitter.
                client.post('statuses/update', tweet, (error, tweet, response) => {
                    if (!error) {
                        console.log'Successfully tweeted @ ${datas.screen_name}');
                    }
                });
              }
          }
          // If we still need to tweet more users set a time-out to repeat the process in a minute on the next user. Time-out ensures we follow Twitter Rate Limits.
          if( ++i < loop ) {
              setTimeout( () => {
                  runTweet(i, loop);
              }, 180000 ); // 3 minute delay between tweets. Can use a random generator to vary wait times.
          }
      });
}
// Parameters to pass into the Twitter API GET call to specify the user.
// Attributes:
//        screen_name : The @name of the targeted user.
const targetUser = {
  screen_name: 'enter users @name' // Example: KFC
}

// The GET Twitter API method to retrieve the followers of a specified user.
// Inputs:
//        call : followers/ids
//        arguments : object indicating the user screen_name
//        callback : returns errors, the user_ids of the followers, and the twitter API indication of success
client.get('followers/ids', targetUser, (err, data, response) => {
    console.log('Currently getting the followers of ${params.screen_name}');
    if(err){
        console.log('Something went wrong while getting the list of users...')
        return console.log(err);
    }
    dataNames = data.ids; // Store the returned user_ids
    let loop = dataNames.length; // Set the loop size to the amount of user objects + 1;
    tweetUser(0, loop); // Start the loop of tweets.
});
