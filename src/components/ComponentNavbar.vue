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
        <button 
          class="navbar-toggler d-lg-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainNav"
          aria-controls="mainNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/" aria-current="page">
                Home<span class="visually-hidden">(current)</span>
              </router-link>
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
            <a href="http://127.0.0.1:8000/admin" class="btn admin-btn p-2" target="__blank">
              Registrati o Accedi 
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  @use '../assets/scss/partials/variables' as *;

  .navbar {
    background-color: linear-gradient(rgba(23, 32, 43, 0.9), rgba(55, 67, 81, 0.753));
  }

  .navbar-brand {
    color: $d_boo_orange;
  }

  .nav-link {
    color: $d_boo_light;

    &:hover {
      color: $d_boo_orange;
    }
  }

  .btn:hover {
    color: $d_boo_orange;
  }

  .admin .btn {
    background-color: transparent;
    color: $d_boo_orange;
    border: 1px solid $d_boo_orange;

    &:hover {
      color: $d_boo_light;
      border-color: transparent;
    }
  }
</style>