<!DOCTYPE html>
<html lang="en">

<head>
    <title>Hellsten Games News</title>
    <base href="http://hellstengames.com/" target="_self">
    <link rel="stylesheet" href="css/article.css" />

    <?php
    echo file_get_contents(__DIR__ ."/../../../commonhead.php", true);
          echo file_get_contents(__DIR__ . "/../../../commonheadnews.php", true);
     ?>
</head>

<body>

  <?php
    echo file_get_contents(__DIR__ ."/../../../commonheader.php", true);
         echo file_get_contents(__DIR__ . "/../../commonheadernewsnav.php", true);
   ?>

   <article>
     <span class="article-game">Breakout</span>
     <h2>Development Updates</h2>
     <div class="article-heading-line3">
       <span class="companyname">Hellsten Games</span>
       <span class="date">June 15, 2021</span>
       <span class="social-media-icons">
         <a href="" ><img src="imgs/social_media/twitter_icon_24.png" /></a>
         <a href="" ><img src="imgs/social_media/facebook_icon_24.png" /></a>
         <a href="" ><img src="imgs/social_media/instagram_icon_24.png" /></a>
       </span>
     </div>
     <img class="article-banner" src="imgs/news_article_banner_01.png" />
     <p>Breakout game will be released soon! The update will include 50 levels, power ups for the paddle and ball.</p>
     <h3>Development Updates</h3>
     <p>Hellsten Games just recently started up. The website is in the works, as well as the Breakout game. Breakout game will be developed using the Allegro5 framework and will be deployed to steam. Only available for windows. </p>
     <p>A much more detailed news release will get into the game features for Breakout. Screenshots, game assets, and soundtrack to be announced.</p>
     <h3>Future Plans</h3>
     <p>Will be designing and planning next steps for future games in mind. Games such as Bouncer and Gravity Balls which will be developed with the Unity Game engine. For a second phase for Breakout we will move over to Unity Game engine to enhance the experience. This will take a lot of time to figure out, hopefully will create a better experience overall. Unity was chosen in mind to develop high quality games and due to being open source - should allow for much easier learning curve for the development team and deployment to game clients such as steam. We will ensure future games will be available to major operating systems such as Windows, Apple, and Linux. This includes mobile devices such as Android and iOS. Many ideas have been thrown around and much more time will be done to design a fun experience for gamers interested in 2d platformer/puzzle games. Overall super excited to make the announcement and getting the ball rolling. We will be giving more updates and things to come; more specific details on development, game features, and more! Stay tuned!</p>
   </article>

  <?php
    echo file_get_contents(__DIR__ ."/../../../commonfooter.php", true);
   ?>

</body>

</html>
