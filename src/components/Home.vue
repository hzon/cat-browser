<template>
  <div class="container">
    <div class="row py-3">
      <div class="col pr-0">
        <h1>Cat Browser</h1>
      </div>
      <div class="col pl-0">
        <div class="form-group float-right">
          <b-form-select v-model="breed.selected" :options="breed.list" @change="displayImages()"></b-form-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center" v-if="images.display.length === 0">No cats available</div>
      <div class="col-md-3 col-sm-6 col-12 py-2" v-for="object in images.display"  v-else>
        <b-card v-bind:img-src="object.url" img-top>
          <router-link class="btn btn-primary btn-block" :to="object.id">
            View details
          </router-link>
        </b-card>
      </div>
    </div>
    <div class="row py-3 justify-content-center" v-if="images.hasMore">
      <div class="col-md-3 col-sm-4 col-6">
        <button type="button" class="btn btn-success w-100" @click="loadMore()">
          Load more ({{ this.images.all.length - this.images.display.length > 999 ? '999+' :
          this.images.all.length - (this.images.page * this.images.displayLimit) }})
        </button>
      </div>
    </div>
  </div>
</template>

<style>

</style>
  #breed-select {
    width: 200px;
  }
<script>
  export default {
    data() {
      return {
        params: this.$route,
        request: {
          complete: false,
          page: 1
        },
        breed: {
          list: [
            { value: '', text: 'Select Breed'}
          ],
          selected: '',
        },
        images: {
          all: [],
          reserveLimit: 999,      //Threshold to prevent too much image requests
          display: [],
          displayLimit: 12,       //Limit on the images to be displayed per "page"
          page: 1,
          hasMore: false
        }
      }
    },

    methods: {
      displayImages: function() {
        this.images.page = 1;

        if(this.breed.selected !== "") {
          this.fetchImages();
        } else {
          this.images.all = [];
          this.images.display = [];
        }
      },

      /** This recursively requests for images of a specified breed. Request stops once a predefined
       * limit is hit.
       */
      fetchImages: function () {
        const APILimit = 100;       //Maximum limit for image request. Defined on https://docs.thecatapi.com/api-reference/images/images-search

        this.$axios.get('https://api.thecatapi.com/v1/images/search?limit=' + APILimit + '&page' + this.request.page +
          '&breed_id=' + this.breed.selected)
          .then(response => {
            if (this.request.page > 1) {
              for(let i=0; i < response.data.length; i++) {
                if(this.images.all.indexOf(response.data[i]) === -1) {
                  this.images.all.push(response.data[i]);
                } else {
                  this.request.complete = true;
                  break;
                }
              }
            } else {
              this.images.all = response.data;
              this.images.display = this.images.all.slice(0, this.images.displayLimit);
              this.images.hasMore = this.images.all.length > this.images.displayLimit;

              // Personal use cases have shown that the image count for each breed don't go beyond a
              // hundred. Moreover, requests are completed on first fetch. Nevertheless, recursive
              // fetching is still pursued in case site will house more images.
              if (response.data.length < APILimit) {
                this.request.complete = true;
              }
            }

            if ((!this.request.complete) &&
              (this.images.all.length - this.images.display.length <= this.images.reserveLimit)) {
              this.request.page++;
              this.fetchImages();
            }
          });
      },

      loadMore: function () {
        let slicedImages = this.images.all.slice((this.images.page * this.images.displayLimit),
          (++this.images.page * this.images.displayLimit));
        this.images.display = this.images.display.concat(slicedImages);
        this.images.hasMore = this.images.all.length > this.images.display.length;

        if ((!this.request.complete) &&
          (this.images.all.length - this.images.display.length <= this.images.reserveLimit)) {
          this.request.page++;
          this.fetchImages();
        }
      },
    },

    mounted() {
      this.$axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => {
          response.data.forEach(item => {
            let option = {};

            option.value = item.id;
            option.text = item.name;

            this.breed.list.push(option);
          });
        });

      // Capture breed type data passed from detail page and preload corresponding images
      let param = this.$route.query.breed;
      if (typeof param !== 'undefined') {
        this.breed.selected = param;
        this.displayImages();
      }
    }
  }
</script>
