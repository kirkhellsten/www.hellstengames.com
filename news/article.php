<!DOCTYPE html>
<html lang="en">

<head>
    <title>Hellsten Games News</title>
    <link rel="stylesheet" href="css/news.css" />

    <?php
    echo file_get_contents("commonhead.php");
     ?>
</head>

<body>

  <?php
  echo file_get_contents("commonheader.php");
   ?>

   <section id="section-news">
     <h1>Recent News</h1>
     <ol class="article-list" id="recent-articles">
        <li class="article-list-item">
          <article>
            <a href="">
              <div class="article-list-item-content">
                <div class="article-list-item-image-container">
                    <img src="imgs/news_article_banner_01.png" />
                </div>
                <div class="article-list-item-content-grid">
                  <div class="article-list-item-subtitle">Breakout</div>
                  <h2 class="article-list-item-title">Release Notes</h2>
                  <div class="article-list-item-description">This new release is now available on steam. Breakout hard with 50 levels on main campaign. Collect power ups to aid you in your journey to beat all levels. Watchout for power downs that hinder your progress or straight out kill you.</div>
                  <div class="article-list-item-footer">a day ago</div>
                </div>
              </div>
            </a>
          </article>
        </li>
     </ol>
   </section>

  <?php
  echo file_get_contents("commonfooter.php");
   ?>

</body>

</html>
