<script>
export default {
    name: 'ComponentNavbar'
}
</script>

<template>
    <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">DeliveBoo</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
          aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/" aria-current="page">Home<span
                  class="visually-hidden">(current)</span></router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li> -->

            <li class="nav-item">
              <router-link class="nav-link" to="/food">Food</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contacts">Contacts</router-link>
            </li>
          </ul>
          <div class="admin">
            <a href="http://127.0.0.1:8000/admin" class="btn" target="__blank">
              Admin <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                <path fill-rule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </nav>

  </header>
</template>
<style scoped>
</style>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.navbar {
  background-color: linear-gradient(rgba(23, 32, 43, 0.9), rgba(55, 67, 81, 0.753));
}

.navbar-brand {
  color: $d_boo_orange;
}

.nav-link:hover {
    color:$d_boo_orange;
}

.btn:hover {
    color:$d_boo_orange;
}
  
.my-bg {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

</style>