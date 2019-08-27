<template>
    <v-content>
        <v-flex xs10 offset-xs1>

            <add-items></add-items>  

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

                                <v-container>
                                    <v-row>
                                        <v-col
                                          cols="auto"
                                          class="item_price mr-auto"
                                        >
                                            {{  item.price  }}$
                                        </v-col>
                                        <v-col cols="auto">
                                            {{ item.count }} <v-icon>mdi-box-shadow</v-icon>
                                        </v-col>
                                    </v-row>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      text
                                      color="error"
                                      block
                                      outlined
                                      @click="deleteItem(item)"
                                    >
                                      Delete
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
                      v-if="this.$store.getters.userItems == null"
                    ></v-progress-circular>
                    <div v-else>You have no products for sale.</div>
                </div>                      
            </v-container>          
        </v-flex>
    </v-content>
</template>

<script>
const addItems = () => import(/* webpackChunkName: "add-item" */ './add-item')
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
          requestUserItems(){
            this.$store.dispatch('getUserItems');
          },
          deleteItem(item){
            this.$store.dispatch('deleteItem', item);
          }
        },
        watch:{
          pagination: function(val){
            this.$router.push({ name: 'sellerPage', params: { page: this.pagination }});
          },
        },
        computed:{
          userItems(){
            return this.$store.getters.userItems;
          },
          paginationLength(){
            if (this.$store.getters.userItems) {
              return Math.ceil(this.userItems.length / this.pageItems);
            }
          },
          showedItem(){
              return this.page * (this.pageItems) - (this.pageItems);
          },
          pageView(){
            if (this.$store.getters.userItems) {
              return this.$store.getters.userItems.slice(this.showedItem, this.showedItem + this.pageItems)
            }            
          }
        },
        components:{
          addItems,
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

</style>


