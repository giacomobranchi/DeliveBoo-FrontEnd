<script>
export default {
  name: 'ComponentFooter'
}
</script>

<template>
  <footer>
    <div class="footer-top">
      <div class="container footer flex-wrap">
        <div class="lists d-flex flex-wrap justify-content-around">

          <div class="aiuto col-12 col-lg-4 col-xl-3 py-3">
            <h4>Aiuto</h4>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><a href="">Contatti</a></li>
              <li><router-link class="nav-link effect" aria-current="page" to="/FAQ">FAQ</router-link></li>
              <li @click="reload" class="nav-item">
                <router-link :to="{ name: 'allRestaurantsList', params: { slug: '' } }" class="nav-link">Tipi di
                  cucina</router-link>
              </li>
            </ul>
          </div>

          <!-- End section Aiuto -->

          <div class="note_legali col-12 col-lg-4 col-xl-3 py-3">
            <h4>Note Legali</h4>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><router-link class="nav-link effect" aria-current="page" to="/TerminiPrivacyCookies">Termini &
                  Condizioni</router-link></li>
              <li><router-link class="nav-link effect" aria-current="page" to="/TerminiPrivacyCookies">Informazioni sulla
                  privacy</router-link></li>
              <li><router-link class="nav-link effect" aria-current="page"
                  to="/TerminiPrivacyCookies">Cookies</router-link></li>
            </ul>
          </div>

          <!-- End section Note legali -->

          <div class="scopri_deliveboo col-12 col-lg-6 col-xl-3 py-3">
            <h4>Scopri DeliveBoo</h4>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><router-link class="nav-link effect" aria-current="page" to="/TeamSviluppo">Team di
                  Sviluppo</router-link></li>
              <li @click="reload" class="nav-item">
                <router-link :to="{ name: 'allRestaurantsList', params: { slug: '' } }"
                  class="nav-link">Ristoranti</router-link>
              </li>
              <li><a href="#">Altro </a></li>
            </ul>
          </div>
          <!-- End section Scopri DeliveBoo -->

          <div id="social-media-icons" class="about col-12 py-3">
            <ul class="list-unstyled social-icons d-flex justify-content-around align-items-center m-0">
              <li><a href="#"><i class="fab fa-facebook-f icon"></i></a></li>
              <li><a href="#"><i class="fab fa-twitter icon"></i></a></li>
              <li><a href="#"><i class="fab fa-linkedin-in icon"></i></a></li>
              <li><a href="#"><i class="fab fa-google-plus-g icon"></i></a></li>
            </ul>
          </div>
          <!-- End section Social Media Icons -->

          <div class="text-center m-auto pb-3">
            <h5>Contatti</h5>
            <div class="line text-center" style="width: auto;"></div>
            <ul class="list-unstyled d-flex flex-wrap my-2 gap-4">
              <li>Email : <i href="#">supporto@deliveboo.com</i></li>
              <li>Telefono : +39 3215684795</li>
              <li>Indirizzo : Via Roma, 1900, 00100 Roma RM, Italia</li>
            </ul>
            <img id="logo" src="../assets/img/db-logo.PNG" alt="logo" class="col-md-12">
          </div>
          <!-- End section Contatti -->

        </div>


      </div>
    </div>
    <!-- End Footer top -->

    <div class="footer-bottom text-white bg-dark p-2">
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

  .aiuto,
  .note_legali,
  .scopri_deliveboo,
  .lists {
    color: $d_boo_light;
    padding-top: 2rem;
  }

  .icons {
    justify-content: space-between;
  }

  .line {
    border: 2px solid $d_boo_orange;
    width: 60px;
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

  #logo {
    width: 120px;
  }

  p {
    padding-right: 2rem;
  }

  span {
    color: $d_boo_primary;
  }

  a {
    &:hover {
      color: $d_boo_orange;
    }
  }

  @media (max-width: 576px) {
    .about {
      padding-left: 1rem;
    }
  }

}
</style>