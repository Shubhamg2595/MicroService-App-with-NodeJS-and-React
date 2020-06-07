# MicroService-App-with-NodeJS-and-React
First Introduction to MicroServices : Creating a simple blog App using React ,Node and ExpressJS

For frontEnd : ReactJS is used.

No DB used for storage purposes.


A simple Blogging App that allows you to create posts, commenting feature on posts, filtering of comments based on content.This is my first learning exercise towards world of microservices. 

Major services are : 

*Posts service : Handles creation of posts

*Comments service : handles comment addition to posts

*Moderation service : Handles comment filtering based on content posted. If comment contains a word 'orange' , it will be rejected, otherwise validated and displayed to user.
why i created moderation service : because in long run there can be 'n' number of cases where we will need to update a specific comment in post like edit comment, flag a comment, upvote and downvote. Now all these features can be handled using moderation service. so even if this service fails, our commenting feature will work perfectly.

*Query Service : provides listing of posts , along with their respective comments. Useful because even if posts and comment service fails,
users will still be able to see existing posts.

*Event-Bus : a simple event bus created using express handles the async communication between all the services and also maintains eventBusStore to handle event synchronization in case of any service failure.


