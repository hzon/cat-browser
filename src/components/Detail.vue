<template>
  <div class="container">
    <div class="py-3">
      <b-card no-body>
          <template v-slot:header>
            <router-link class="btn btn-primary" :to="'/?breed=' + breed.id">
              Back
            </router-link>
          </template>
          <b-card-img v-bind:src="cat.url"></b-card-img>
          <b-card-body>
            <b-card-title>{{ this.breed.name }}</b-card-title>
            <b-card-text>
              <h5>Origin: {{ this.breed.origin }}</h5>
              <h6>{{ this.breed.temperament }}</h6>
              <p>{{ this.breed.description }}</p>
            </b-card-text>
          </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        cat: {},
        breed: {},
      }
    },

    mounted() {
      this.$axios.get('https://api.thecatapi.com/v1/images/' + this.id)
        .then(response => {
          this.cat = response.data;
          this.breed = response.data.breeds[0]
        });
    }
  }
</script>
