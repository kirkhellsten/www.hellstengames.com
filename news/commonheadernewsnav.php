<nav class="news-nav">
  <ol>
    <li><a class="dropdown-link" href=""><?php

      if ($_SERVER['REQUEST_URI'] == "/") {
        echo "All News";
      } else {
        $newsNavDropdownTitle = ucfirst(rtrim(explode("/", ltrim($_SERVER['REQUEST_URI'], "/"))[0], "/"));
        echo $newsNavDropdownTitle;
      }

    ?><i class="arrow down"></i></a>
      <ol>
        <li><a class="news-nav-anchor" href="http://news.hellstengames.com"><img src="https://img.icons8.com/fluent/50/000000/squared-menu.png"/>All News</a></li>
        <li><a class="news-nav-anchor" href="http://news.hellstengames.com/breakout/">Breakout</a></li>
        <li><a class="news-nav-anchor" href="http://news.hellstengames.com/bouncer/">Bouncer</a></li>
        <li><a class="news-nav-anchor" href="http://news.hellstengames.com/gravityballs/">Gravity Balls</a></li>
      </ol>
    </li>
  </ol>
</nav>
