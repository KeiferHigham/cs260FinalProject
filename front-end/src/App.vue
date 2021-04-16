<template>
  <div id="app">
    <div class="user" v-if="this.$root.$data.user != null">
      <h2> Logged in as {{user.firstName}} {{user.lastName}} <br> <a @click="logout">Log Out</a></h2>
    </div>
    <div id="nav">
      <router-link class="router" to="/">Home </router-link>
      <div v-if="this.$root.$data.user != null">
      <router-link class="router" to="/Favorites">Favorites </router-link>
    </div>
      <router-link class="router" to="/Find">Find </router-link>
      <router-link class="router" to="/Add">Add </router-link>
      <router-link class="router" to="/Login">Login</router-link>
    </div>
    <router-view/>
  <!--<p> {{GetFirstItem}} </p>-->
  <div class="footer-names">
          <p>Keifer Higham, Katie Rencher 15 hours</p>
</div>


  <div class="github-footer-fixed"><a href='https://github.com/KeiferHigham/cs260FinalProject'><img src='../images/github-dark.svg' /></a></div>
  </div>

</template>



<script>
import axios from 'axios';
export default {

  computed: {

    numCartItems () {
      const numItems = this.$root.$data.numItems
      return numItems
    },
    GetFirstItem () {
    return this.$root.$data.Movies[0]
    },
    user() {
    return this.$root.$data.user;
  },

  },
  methods: {
    async logout() {
  try {
    await axios.delete("/api/users");
    this.$root.$data.user = null;
  } catch (error) {
    this.$root.$data.user = null;
  }
},
  }

  }

</script>

<style>
body {
  background-color: #d4e0fa;
}

.github-footer-fixed {
user-select: none;
width: 40px;
height: 40px;
position: fixed;
right: 2vh;
bottom: 2vh;
font-size: 25%;
}

h2 {
  font-size: 16px;
  float: right;
}

.router {
  margin-right: 5px;
  margin-left: 5px;
}

.footer-names {
position: fixed;
right: 10vh;
bottom: 2vh;
font-size: 25%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  font-size: 45px;
  padding-top: 80px;
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media only screen and (max-width:401px) {
  #nav {
    font-size: 20px;
  }

}
</style>
