<script>
export default {
  name: 'ComponentFooter'
}
</script>

<template>
  <footer>
    <div class="footer-top">
      <div class="container footer flex-wrap">
        <div class="lists d-flex flex-wrap justify-content-between">

          <div class="about col-12 col-lg-6 col-xl-4 p-3">
            <h5>Aiuto</h5>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><a href="">Contatti</a></li>
              <li><a href="">FAQ</a></li>
              <li><a href="">Tipi di cucina</a></li>
            </ul>
          </div>

          <!-- End section Aiuto -->

          <div class="about col-12 col-lg-6 col-xl-4 p-4">
            <h5>Note Legali</h5>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><a href="">Termini & Condizioni</a></li>
              <li><a href="">Informazioni sulla privacy</a></li>
              <li><a href="">Cookies</a></li>
            </ul>
          </div>

          <!-- End section Note legali -->

          <div class="about col-12 col-lg-6 col-xl-3 p-4">
              <h5>Scopri DeliveBoo</h5>
              <div class="line"></div>
              <ul class="list-unstyled my-2">
                  <li><a href="">Team di sviluppo</a></li>
                  <li><a href="">Ristoranti</a></li>
                  <li><a href="">Altro </a></li>
              </ul>
          </div>
          <!-- End section Scopri DeliveBoo -->
          
        </div>

        <div id="social-media-icons" class="about col-12 ">
            <ul class="list-unstyled social-icons d-flex justify-content-around">
                <li><a href="#"><i class="fab fa-facebook-f icon"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter icon"></i></a></li>
                <li><a href="#"><i class="fab fa-linkedin-in icon"></i></a></li>
                <li><a href="#"><i class="fab fa-google-plus-g icon"></i></a></li>
            </ul>
        </div>
        <!-- End section Social Media Icons -->

      </div>
    </div>
    <!-- End Footer top -->

    <div class="footer-bottom text-white bg-dark">
      <div class="d-flex justify-content-center flex-wrap mx-2 pt-3">
        <div class="left d-flex">
          <p>Term And Conditions</p>
          <p>Policy</p>
          <p>About</p>
        </div>
        <div class="right d-flex">
          <img src="" alt="">
          <p>&#169; 2023 All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
          
<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;
@use '../assets/scss/partials/social_media_icons' as *;

footer {

  background: linear-gradient(rgba(23, 32, 43, 0.9), rgba(55, 67, 81, 0.753));

  .lists {
    color: $d_boo_light;
    padding-top: 2rem;
  }

  .icons {
    justify-content: space-between;
  }

  .line {
    border: 2px solid $d_boo_orange;
    width: 40px;
  }

  .list-unstyled a {
    text-decoration: none;
    color: white;
    margin-bottom: 10px;
  }

  .list-unstyled li {
    margin-bottom: 10px;
  }

  .footer-bottom {
    color: $d_boo_light;
  }

  p {
    padding-right: 2rem;
  }

  span {
    color: $d_boo_primary;
  }
  
}
</style>