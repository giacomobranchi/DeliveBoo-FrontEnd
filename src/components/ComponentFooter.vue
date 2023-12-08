<script>
export default {
    name: 'ComponentFooter'
}
</script>

<template>
  <footer class="">
      <div class="footer d-flex flex-wrap">
        <div class="lists d-flex flex-wrap">
          <div class="about col-12 col-lg-6 col-xl-3 p-3">
            <h5>About Us</h5>
            <div class="line"></div>
              <p class="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo laborum iure temporibus repellat id ipsum, deleniti debitis cum quis velit dolorum ipsam iusto magnam quo quisquam!</p>
              <div class="icons d-flex flex-wrap">
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
      margin-left: 15%;
      margin-right: 15%;
      padding-top: 2rem;
      .icons {
        .facebook, .twitter, .linkedin, .instagram, .pinterest {
          width: 40px;
          height: 40px;
          padding-left: 13px;
          padding-right: 14px;
          padding-top: 5px;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          cursor: pointer; 
          &:hover {
            background-color: transparent;
          }
        }
        .facebook{
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
    .line {
      border: 2px solid $d_boo_light;
      width: 40px;
    }
  }


</style>