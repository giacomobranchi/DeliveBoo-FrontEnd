<template>
  <div class="container-fluid container_TeamSviluppo py-3">
    <div class="container my-3">
      <h1 class="text-center text-white">Team di Sviluppo</h1>
      <div class="row card_Booleaner rounded-4 p-3 mt-4">
        <div class="col-lg-4 img-fluid">
          <div class="img-photo">
            <img src="../../src/assets/img/giacomo.jpeg" class="rounded-4" alt="">
          </div>
        </div>
        <div class="col-lg-8 text-center">
          <h3 class="name">Giacomo Branchi</h3>
          <hr>
          <h5 class="position">Jr Full Stack Developer</h5>
          <div class="description">
            Ciao, sono Giacomo Branchi, uno sviluppatore Full Stack Junior appassionato di tecnologia e programmazione. Ho
            contribuito allo sviluppo di Deliveboo in vari modi, tra cui la progettazione e l'implementazione di
            funzionalità back-end e front-end.
          </div>
        </div>
      </div>
      <div class="row card_Booleaner rounded-4 p-3 mt-4">
        <div class="col-lg-4 order-lg-2 img-fluid">
          <div class="img-photo">
            <img src="../../src/assets/img/lorenzo.jpeg" class="rounded-4" alt="">
          </div>
        </div>
        <div class="col-lg-8 text-center order-lg-1">
          <h3 class="name">Lorenzo Neri</h3>
          <hr>
          <h5 class="position">Jr Full Stack Developer</h5>
          <div class="description">
            Ciao, sono Lorenzo Neri, uno sviluppatore Full Stack Junior appassionato di tecnologia e programmazione. Ho
            contribuito allo sviluppo di Deliveboo in vari modi, tra cui la progettazione e l'implementazione di
            funzionalità back-end e front-end.
          </div>
        </div>
      </div>
      <div class="row card_Booleaner rounded-4 p-3 mt-4">
        <div class="col-lg-4 img-fluid">
          <div class="img-photo">
            <img src="../../src/assets/img/pietro.jpeg" class="rounded-4" alt="">
          </div>
        </div>
        <div class="col-lg-8 text-center">
          <h3 class="name">Pietro Cipolla</h3>
          <hr>
          <h5 class="position">Jr Full Stack Developer</h5>
          <div class="description">
            Ciao, sono Pietro Cipolla, uno sviluppatore Full Stack Junior appassionato di tecnologia e programmazione. Ho
            contribuito allo sviluppo di Deliveboo in vari modi, tra cui la progettazione e l'implementazione di
            funzionalità back-end e front-end.
          </div>
        </div>
      </div>
      <div class="row card_Booleaner rounded-4 p-3 mt-4">
        <div class="col-lg-4 order-lg-2 img-fluid">
          <div class="img-photo">
            <img src="../../src/assets/img/claudio.png" class="rounded-4" alt="">
          </div>
        </div>
        <div class="col-lg-8 text-center order-lg-1">
          <h3 class="name">Claudio Bernardinetti</h3>
          <hr>
          <h5 class="position">Jr Full Stack Developer</h5>
          <div class="description">
            Ciao, sono Claudio Bernardinetti, uno sviluppatore Full Stack Junior appassionato di tecnologia e
            programmazione. Ho contribuito allo sviluppo di Deliveboo in vari modi, tra cui la progettazione e
            l'implementazione di funzionalità back-end e front-end.
          </div>
        </div>
      </div>
      <div class="row card_Booleaner rounded-4 p-3 mt-4">
        <div class="col-lg-4 img-fluid">
          <div class="img-photo ">
            <img src="../../src/assets/img/fabio.jpeg" class="rounded-4" alt="">
          </div>
        </div>
        <div class="col-lg-8 text-center">
          <h3 class="name">Fabio Vasi</h3>
          <hr>
          <h5 class="position">Jr Full Stack Developer</h5>
          <div class="description">
            Ciao, sono Fabio Vasi, uno sviluppatore Full Stack Junior appassionato di tecnologia e programmazione. Ho
            contribuito allo sviluppo di Deliveboo in vari modi, tra cui la progettazione e l'implementazione di
            funzionalità back-end e front-end.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.container_TeamSviluppo {
  background-color: $d_boo_bg;
  min-height: 100vh;
}

.card_Booleaner {
  background-color: rgb(239, 235, 235);
}

.row {
  transition: .5s;


  &:hover {
    background-color: $d_boo_orange;
    border-radius: 5px;
  }

  .img-photo img {
    background-color: black;
    height: 200px;
    width: 200px;
    border: 3px solid black;
    object-fit: contain;
    display: block;
    margin: auto;
  }
}
</style>
    
  
  