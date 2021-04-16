<template>
  <div>
    <h1>My Favorites list</h1>
    <div id="favorites">
      <div class="movies" v-for="(movie) in userMovies" :key="movie.data.id">
        <div v-if="movie.data.title != null">
        <div class="movie">
          <h2>{{movie.data.title}}</h2>
          <div class="movieGroup">
          <img :src="movie.data.path">
          <button @click="Remove(movie)"> Remove </button>
        </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
 name: 'Favorites',
 data: function() {
   return {
     WildList: [],
     userMovies: []
   }
 },
 created() {
   this.favList()
 },
  methods: {
    async favList() {
      try {
        let response = await axios.get("/api/favorite/getfavorites/" + this.$root.$data.user._id);
        this.WildList = response.data;
        try {
          for(let i = 0; i < this.WildList.length; ++i) {
             let responseTwo = await axios.get("/api/allmovies/usermovies/" + this.WildList[i].movie)
             this.userMovies.push(responseTwo);
          }

        }catch(error) {
          console.log(error);
        }
        //console.log(response.data);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async Remove (movie) {
      //this.$root.$data.Favorites.splice(movieIndex, 1);

      try {
        await axios.delete("/api/favorite/deletefavorite/" + movie.data._id);
        this.findData = null;
        this.userMovies = [];
        this.favList();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
  .movieGroup {
    display: flex;
    flex-direction: column;
  }

  #favorites {
    margin-bottom: 55px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .movie {
    width: 300px;
    display: flex;
    flex-direction: column;
  }

</style>
