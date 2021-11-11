<!DOCTYPE html>
<html lang="en">

<head>
    <title>Hellsten Games About</title>

    <link rel="stylesheet" href="css/about.css" />

    <?php
    echo file_get_contents("commonhead.php");
     ?>

</head>

<body>
 
  <?php
  echo file_get_contents("commonheader.php");
   ?>

   <section id="philosphy-section" class="main-content-section dark">
      <div class="main-inner-content">
        <div class="main-inner-content-image">
          <img src="imgs/philosophy+logo.png" />
        </div>
        <div class="main-inner-content-text">
          <h1>Our Mission</h1>
          <p>People should be having fun, playing games is one way to have fun. We want you to have fun playing games and be fulfilled. We also want our dreamed about game worlds to come true. We envision game worlds and make it a reality. Combining this with fun, we hope to make games that impact people positively and give them a gaming experience they will remember.</p>
        </div>
     </div>
   </section>

  <section id="team-section" class="main-content-section blue">
     <div class="main-inner-content">
      <!-- <h1>Team</h1> -->
      <div class="team-description-area">
        <div class="team-photo-container">
          <img class="team-photo" src="imgs/me.jpg" />
          <span class="team-name">Kirk Hellsten</span>
          <span class="team-role">CEO</span>
        </div>
        <div class="team-description-container">
          <p class="team-description-text">The founder of the company. New to the video game industry, started Hellsten Games to make his game envisions a reality.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="developer-tools" class="main-content-section dark">
     <div class="main-inner-content">
       <h1>Game Engines for Development</h1>
       <div class="engine-content-container">
        <img src="imgs/powered-by-unity.jpg" />
        <img width=300 src="imgs/sfml-logo-big.png" />
       </div>
    </div>
  </section>

  <?php
  echo file_get_contents("commonfooter.php");
   ?>
</body>

</html>
