<!DOCTYPE html>
<html lang="en">

<head>
    <title>Hellsten Games</title>
    <meta name="description" content="Creators of the Breakout, Bouncer, and Gravity Balls, Hellsten Games is an indie game developer responsible for new and daring 2D platformer adventure puzzle games, from both classic and original game ideas.">

    <link rel="stylesheet" href="css/slider.css" />

      <?php
      echo file_get_contents("commonhead.php");
       ?>

       <script
         src="js/slider.js"
       ></script>

</head>

<body>

  <?php
  echo file_get_contents("commonheader.php");
   ?>

   <section id="section-main-page-promotion">
     <div id="promotion-slider">
       <div id="slide1" class="promotion-slider-item active"
          data-imgsrc="imgs/breakout_banner_02.png">
          <!--
         <a href="">Buy Now</a>
         <a href="">Learn More</a>
       -->
       <span class="slide-title">Break the Bricks & Power Up</span>
       <a id="slide1-button" class="slide-button" href="#">Play Today</a>
       </div>
       <div class="promotion-slider-item"
        data-imgsrc="imgs/bouncer_banner_02.png">
            <!--
         <a href="">Buy Now</a>
       -->
       <span class="slide-title">Always Bouncing with Bouncer</span>
       <a id="slide2-button" class="slide-button" href="http://news.hellstengames.com/bouncer/">News Updates</a>
       </div>
       <div class="promotion-slider-item"
          data-imgsrc="imgs/gravityballs_banner_02.png">
          <!--
         <a href="">Buy Now</a>
       -->
       <span class="slide-title">Gravity Balls Coming Soon!</span>
       <a id="slide3-button" class="slide-button" href="http://news.hellstengames.com/gravityballs/">Development News</a>
       </div>
     </div>
     <div id="promotion-slider-tab-container">
       <div class="promotion-tab-item active">
       </div>
       <div class="promotion-tab-item">
       </div>
       <div class="promotion-tab-item">
       </div>
    </div>
    <div id="promotion-slider-arrow-container">
      <div id="promotion-slider-arrow-left" class="promotion-slider-arrow"><i class="promotion-slider-arrow promotion-slider-arrow-left"></i></div>
      <div id="promotion-slider-arrow-right" class="promotion-slider-arrow"><i class="promotion-slider-arrow promotion-slider-arrow-right"></i></div>
    </div>
   </section>


     <div id="games-container">

       <div class="content-wrapper">
         <h1 id="games-title">Games</h1>

         <div class="game-tiles-container">
            <a href="http://breakout.hellstengames.com" class="">
              <img class="game-tile-image" src="imgs/breakout_games_tile.png" alt="Explore Breakout">
            </a>

            <a href="http://bouncer.hellstengames.com" class="">
              <img class="game-tile-image" src="imgs/bouncer_games_tile.png" alt="Explore Bouncer">
            </a>

            <a href="http://gravityballs.hellstengames.com" class="">
              <img class="game-tile-image" src="imgs/gravityballs_games_tile.png" alt="Explore Gravity Balls">
            </a>
          </div>
        </div>

     </div>


  <?php
  echo file_get_contents("commonfooter.php");
   ?>

</body>

</html>
