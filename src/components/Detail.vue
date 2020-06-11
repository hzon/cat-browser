<template>
  <div class="container">
    <div class="py-3">
      <div class="card">
        <div class="card-header">
          <a class="btn btn-primary" :href="'/?breed=' + breed.id">
            Back
          </a>
        </div>
        <img class="card-img" :src="cat.url">
        <div class="card-body">
          <h4>{{ this.breed.name }}</h4>
          <h5>Origin: {{ this.breed.origin }}</h5>
          <h6>{{ this.breed.temperament }}</h6>
          <p>{{ this.breed.description }}</p>
        </div>
      </div>
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
