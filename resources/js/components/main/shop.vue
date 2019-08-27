<template>
   <v-content>
        <v-flex xs10 offset-xs1>
            <v-container v-if="pageView && pageView.length">
                <v-row 
                  class="mb-6"
                  no-gutters
                  v-for="(row, index) in pageView"
                  :key="index"
                >
                    <v-col class="mt-5" v-for="item in row" :key="item.id">
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          class="mx-auto"
                          max-width="315"
                          min-width="215"
                          :elevation="hover ? 22 : 2"
                        >
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title class="headline">{{  item.title  }}</v-list-item-title>
                                <v-list-item-subtitle>by {{item.seller.name}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-carousel 
                              hide-delimiters 
                              :show-arrows="item.photos.length > 1? true: false"
                              height="200"
                              >
                              <v-carousel-item
                                v-for="(item,i) in item.photos"
                                
                                :key="i"
                                :src="item.path"
                                reverse-transition="fade-transition"
                                transition="fade-transition"
                              ></v-carousel-item>
                            </v-carousel>

                            <v-card-text>
                              <span class="text--primary">
                                <span>{{ item.description }}</span><br>                               
                              </span><br>
                            </v-card-text>


                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  block
                                  @click="cartAddItem(item)"
                                >
                                  <span class="item_price">{{item.price}}$</span> 
                                  <v-spacer></v-spacer>
                                  <v-icon>mdi-cart-outline</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                      </v-hover>
                    </v-col>
                </v-row>          
                <div class="text-center">
                  <v-pagination
                    v-model="pagination"
                    :length="paginationLength"
                    circle
                  ></v-pagination>
                </div>
            </v-container>
            <v-container v-else>
                <div class="text-center">
                    <v-progress-circular
                      :size="70"
                      class="mt-5"
                      color="primary"
                      indeterminate
                      v-if="pageView == null"
                    ></v-progress-circular>
                    <div v-else>No products on sale.</div>
                </div>                      
            </v-container> 
            <v-btn 
              v-if="cart && cart.length"
              fab 
              class="cart-btn"       
              :to="{name: 'cart'}"       
            >
              <v-icon>
                mdi-cart
              </v-icon>
            </v-btn> 
        </v-flex>
    </v-content>
</template>
</template>

<script>
  export default {
    data(){
      return{
        pageItems: 3,
        pagination: 1
      }
    },
    props: ['page'],
    mounted(){
      this.pagination = +this.page;
    },
    methods:{
      requestItems(){
        this.$store.dispatch('getItems');
      },
      cartAddItem(item){
        this.$store.dispatch('cartAddItem', item);
      }
    },
    watch:{
      pagination: function(val){
        this.$router.push({ name: 'shop', params: { page: this.pagination }});
      },
    },
    computed:{
      items(){
        return this.$store.getters.items;
      },
      paginationLength(){
        if (this.$store.getters.items) {
          return Math.ceil(this.items.length / this.pageItems);
        }
      },
      showedItem(){
        return this.page * (this.pageItems) - (this.pageItems);
      },
      pageView(){
        if (this.$store.getters.items) {
          return this.$store.getters.items.slice(this.showedItem, this.showedItem + this.pageItems);
        }        
      },
      cart(){
        return this.$store.getters.cart
      }
    }
  }
</script>

<style scoped>

.v-card__title{
  color: grey;
}

.item_price{
  font-size: 1.5em;
}

.cart-btn{
  position: fixed;
  bottom: 10%;
  right: 7%;
}

</style>

