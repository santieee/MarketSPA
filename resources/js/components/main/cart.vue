<template>
   <v-content>
        <v-flex xs10 offset-xs1>
            <v-container v-if="pageView && pageView.length">
            	<v-btn block @click="cartClear">Clear cart</v-btn>
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
                                        <v-icon 
                                        	v-if="item.pivot.count > 1" 
                                        	@click="cartDecrement(item)"
                                        >
                                    		mdi-minus
                                    	</v-icon>
                                        	{{ item.pivot.count }} 
                                        <v-icon @click="cartIncrement(item)">mdi-plus</v-icon>	
                                        <v-icon>mdi-box-shadow</v-icon>
                                    </v-col>
                                </v-row>
                               	<div 
                               		style="text-align: right;" 
                               		v-if="item.pivot.count > 1"
                               	>
                               		{{ item.pivot.count *  item.price }}$
                               	</div>                            
                            </v-container>
                            <v-btn 
	                            @click="cartDelItem(item)" 
	                            block
	                            text
	                            outlined
	                            color="error"
                            >
                        		Delete from cart
                    		</v-btn>
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
		              v-if="items == null"
		            ></v-progress-circular>
		            <div v-else>You cart is empty.</div>
		        </div>		 		        
            </v-container>          
        </v-flex>
    </v-content>
</template>

<script>
  export default {
    data(){
      return{
        pageItems: 3,
        pagination: 1
      }
    },
    methods:{
      cartDelItem(item){
      	this.$store.dispatch('cartDelItem', item);
      },
      cartIncrement(item){
		this.$store.dispatch('cartIncrement', item);
      },
      cartDecrement(item){
      	this.$store.dispatch('cartDecrement', item);
      },
      cartClear(){
      	this.$store.dispatch('cartClear');
      }
    },
    computed:{
      items(){
        return this.$store.getters.cart;
      },
      paginationLength(){
        if (this.$store.getters.cart) {
          return Math.ceil(this.items.length / this.pageItems);
        }
      },
      showedItem(){
        return this.pagination * (this.pageItems) - (this.pageItems);
      },
      pageView(){
        if (this.$store.getters.cart) {
          return this.$store.getters.cart.slice(this.showedItem, this.showedItem + this.pageItems);
        }        
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

</style>

