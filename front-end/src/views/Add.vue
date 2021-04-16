<template>
  <div class="add">
    <p>Add your own movies below</p>
    <p>Add a new Movie</p>
    <div class="form">
      <input v-model="title" placeholder="Title">
      <p></p>
      <input v-model="year" placeholder="Year">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <p>To add your movies to your Favorites list go to <strong>Find</strong> above and under Your Movies click Add to Favorites</p>
    <p>Edit the movies you've added</p>
    <div class="edit">
     <div class="form editForm">
       <input v-model="findTitle" placeholder="Search">
       <div class="suggestions" v-if="suggestions.length > 0">
         <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectMovie(s)">{{s.title}}
         </div>
       </div>
     </div>
     <div class="upload" v-if="findMovie">
       <input v-model="findMovie.title" placeholder="Edit Title" class="editInput">
       <input v-model="findMovie.year" placeholder="Edit Year" class="editInput">
       <img :src="findMovie.path" />
     </div>
     <div class="actions" v-if="findMovie">
       <button @click="deleteMovie(findMovie)">Delete</button>
       <button @click="editMovie(findMovie)">Edit</button>
     </div>
   </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Add',
  data() {
    return {
      title: "",
      file: null,
      addMovie: null,
      movies: [],
      findTitle: "",
      findMovie: null,
      year: "",
      id: this.$root.$data.id
    }
  },
  computed: {
    suggestions() {
      let movies = this.movies.filter(movie => movie.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return movies.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getMovies();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/allmovies/newmovie', {
          title: this.title,
          path: r1.data.path,
          year: this.year,
          id: this.id
        });
        this.addMovie = r2.data;
        this.counter();
        this.getMovies();
      } catch (error) {
        console.log(error);
      }
    },
    counter() {
      this.$root.$data.id +=1
      this.id = this.$root.$data.id
    },
    async getMovies() {
      try {
        let response = await axios.get('/api/allmovies/newmovie');
        this.movies = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectMovie(movie) {
      this.findTitle = "";
      this.findMovie = movie;
    },
    async deleteMovie(movie) {
      try {
        await axios.delete("/api/allmovies/newmovies/" + movie._id);
        this.findMovie = null;
        this.getMovies();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editMovie(movie) {
      try {
        await axios.put("/api/allmovies/newmovies/" + movie._id, {
          title: this.findMovie.title,
          year: this.findMovie.year,
        });
        this.findMovie = null;
        this.getMovies();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.upload img {
  width: 300px;

}

.upload {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}

.upload input {

}
</style>
