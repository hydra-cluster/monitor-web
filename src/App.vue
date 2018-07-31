<template>
  <div id="app">
     <section class="hero is-dark is-bold is-fullheight">
       <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <h1 class="is-size-3 has-text-weight-bold">HYDRA</h1>
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroB">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroB" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">
                  Home
                </a>
                <a class="navbar-item">
                  Examples
                </a>
                <a class="navbar-item">
                  Documentation
                </a>
                <span class="navbar-item">
                  <a class="button is-inverted">
                    <span class="icon">
                      <i class="fa fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body" style="align-items: baseline">
        <div class="container is-fluid">
          <div class="row">
            <cluster></cluster>
          </div>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <div class="container">
          <div class="content has-text-centered">
            <p class="is-size-7"> 
               Raspberry Pi Cluster Monitor Web Interface - Version 1.0
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Cluster from './components/Cluster'

export default {
  name: 'app',
  components: {
    Cluster
  }
}
</script>

<style>
</style>