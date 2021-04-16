<template>
  <div class="imagebox">
  <div class="imageview">
  <img :src="movie.path" width="200" />
  <div class="movieInfo">
    <p class="movieTitle">{{movie.title}}</p>
  </div>
  <div v-if="this.$root.$data.user != null">
    <h3> Add a Review</h3>
     <form v-on:submit.prevent="addReview">
     <textarea v-model="addedReview"></textarea>
     <button type="submit">Review</button>
     </form>
   </div>
   <div class="comments">
   <div v-for="review in reviews" :key="review.id">
   <div class="review">
     <p> {{review.review}}<br> </p>
     <p> Review made by {{review.user.firstName}} {{review.user.lastName}} {{formatDate(review.created)}} </p>
   </div>
  </div>
</div>
  </div>
  </div>


</template>


<script>
// @ is an alias to /src
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Review',
  data() {
   return {
     movie: '',
     error: '',
     addedReview: '',
     reviews: [],
   }
 },
 created() {
    this.getMovie();
    this.getReviews();
  },
  methods: {
   async getMovie() {
     try {
       let response = await axios.get("/api/AllMovies/" + this.$route.params.id);
       this.movie = response.data;
     } catch (error) {
       this.error = error.response.data.message;
     }
   },
   async addReview() {
     try {
      await axios.post("/api/review/postreview/" + this.$route.params.id, {review: this.addedReview});
       this.addedReview = '';
       this.getReviews();
     } catch (error) {
       this.error = error.response.data.message;
     }

   },

   async getReviews() {
     try {
    const response =  await axios.get("/api/review/getreviews/" + this.$route.params.id);
    this.reviews = response.data;
     } catch (error) {
       this.error = error.response.data.message;
     }

   },
   formatDate(date) {
     if (moment(date).diff(Date.now(), 'days') < 15)
       return moment(date).fromNow();
     else
       return moment(date).format('d MMMM YYYY');
   },
 }
}
</script>


<style scoped>

.review {
background-color: #D3D3D3;
width: 200px;
margin: 5px;

}
.comments {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}


</style>
