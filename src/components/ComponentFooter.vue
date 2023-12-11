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

          <div class="about col-12 col-lg-6 col-xl-3 p-3">
            <h5>Aiuto</h5>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><a href="">Contatti</a></li>
              <li><a href="">FAQ</a></li>
              <li><a href="">Tipi di cucina</a></li>
            </ul>
          </div>

          <!-- End section Aiuto -->

          <div class="about col-12 col-lg-6 col-xl-3 p-3">
            <h5>Note Legali</h5>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><a href="">Termini & Condizioni</a></li>
              <li><a href="">Informazioni sulla privacy</a></li>
              <li><a href="">Cookies</a></li>
            </ul>
          </div>

          <!-- End section Note legali -->

          <div class="about col-12 col-lg-6 col-xl-3 p-3">
            <h5>Scopri DeliveBoo</h5>
            <div class="line"></div>
            <ul class="list-unstyled my-2">
              <li><a href="">Team di sviluppo</a></li>
              <li><a href="">Ristoranti</a></li>
              <li><a href="">Altro </a></li>
            </ul>
            <div class="icons col-12 d-flex flex-wrap">
              <div class="facebook rounded-circle">
                <img src="../../src/assets/img/image-facebook.svg" alt="">
              </div>
              <div class="twitter rounded-circle">
                <img src="../../src/assets/img/image-twitter.svg" alt="">
              </div>
              <div class="linkedin rounded-circle">
                <img src="../../src/assets/img/image-linkedin.svg" alt="">
              </div>
              <div class="instagram rounded-circle">
                <img src="../../src/assets/img/image-instagram.svg" alt="">
              </div>
              <div class="pinterest rounded-circle">
                <img src="../../src/assets/img/image-pinterest.svg" alt="">
              </div>
            </div>
          </div>
          <!-- End section Scopri DeliveBoo -->
        </div>
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

footer {
  background: linear-gradient(rgba(23, 32, 43, 0.9), rgba(55, 67, 81, 0.753));

  .lists {
    color: $d_boo_light;
    padding-top: 2rem;

    .icons {

      .facebook,
      .twitter,
      .linkedin,
      .instagram,
      .pinterest {
        justify-content: space-between;
        width: 40px;
        height: 40px;
        padding-left: 13px;
        padding-right: 14px;
        padding-top: 5px;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
        transition: .5s;

        &:hover {
          background-color: transparent;
        }
      }

      .facebook {
        background-color: $d_boo_facebook;
        padding-left: 16px;
        padding-right: 16px;
      }

      .twitter {
        background-color: $d_boo_twitter;
      }

      .linkedin {
        background-color: $d_boo_linkedin;
      }

      .instagram {
        background-color: $d_boo_instagram;
        padding-left: 12px;
      }

      .pinterest {
        background-color: $d_boo_pinterest;
        padding-left: 12px;
        padding-right: 18px;
      }
    }
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

  .footer_bottom {
    color: $d_boo_light;
  }

  p {
    padding-right: 2rem;
  }

  span {
    color: $d_boo_primary;
  }
}</style>