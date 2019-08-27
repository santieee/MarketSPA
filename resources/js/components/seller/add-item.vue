<template>
    <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Add item</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-text-field 
                    label="Title" 
                    v-model="formAddItem.title"
                    :error-messages="$v.formAddItem.title.$error ? 'Title is required' : ''"
                ></v-text-field>
                <v-textarea 
                    label="Description" 
                    rows="1" 
                    v-model="formAddItem.description"
                    :error-messages="$v.formAddItem.description.$error ? 'Description is required' : ''"
                ></v-textarea> 
                <v-text-field 
                    label="Price" 
                    type="number"  
                    append-icon="mdi-currency-usd" 
                    min="1" 
                    v-model="formAddItem.price"
                    :error-messages="$v.formAddItem.price.$error ? 'Enter a price' : ''"
                ></v-text-field>
                <v-text-field 
                    label="Count" 
                    type="number" 
                    min="1" 
                    v-model="formAddItem.count"
                    :error-messages="$v.formAddItem.count.$error ? 'Enter a count' : ''"
                ></v-text-field>
                <input 
                    type="file" 
                    multiple 
                    ref="itemImage" 
                    @change="changePhoto" 
                    class="profile-image-input"
                >
               <v-alert 
                    type="error"
                    v-if="$v.formAddItem.photo.$error"
                    outlined
                    class="m-4"
                >
                    Choose photo for your product
                </v-alert>
                <v-btn 
                    color="secondary" 
                    @click="$refs.itemImage.click();"
                    class="btn_addPhoto"
                    rounded
                >  
                   Add photo
                </v-btn>
                
                <div 
                    v-if="uplPhoto.length > 0"
                    class="block_items_photo"
                >
                    <v-fade-transition 
                        v-for="(photo, index) in uplPhoto" 
                        :key="index"
                    >
                        <v-img 
                            :src="photo" 
                            max-width="200px" 
                            max-height="120px" 
                            class="items_photo"    
                        >
                            <v-btn 
                                class="btn_photo" 
                                text
                                light
                                fab
                                x-small
                                @click="deletePhoto(index)"
                            >
                                <v-icon>mdi-close-circle</v-icon>
                            </v-btn>        
                        </v-img>
                    </v-fade-transition>                         
                </div>
                <v-divider></v-divider>
                <v-btn 
                    block 
                    class="submit_add-form"
                    color="primary" 
                    @click="addItem"
                    :loading = "buttonLoading"
                    :disabled = "buttonLoading"
                >
                    Add item
                </v-btn>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels> 
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
    export default {
        data(){
            return{
                formAddItem:{
                    title:'',
                    description:'',
                    count:'',
                    price:'',
                    photo:[]
                },
                uplPhoto: [],
                buttonLoading: false,         
            }
        },
        validations: {
          formAddItem:{
            title:{
                required,
            },
            description:{
                required,
            },
            count:{
                required
            },
            price:{
                required
            },   
            photo:{
                required
            }    
          }                 
        },
        methods:{
            changePhoto(e) {    
                if (e.target.files.length > 3) {
                    alert('Maximum 4 photo');
                    return;
                }
                for(let photo of e.target.files){  
                    if(photo.size > 10000000){
                        alert('Photo must be less 1mb');
                        break;
                    }else if(photo.type !== "image/jpeg" &&  photo.type !== "image/png"){
                        alert('Only jpeg/png!');
                        break;                      
                    }else if(this.uplPhoto.length > 3){
                        alert('Maximum 4 photo');
                        break;
                    }
                    this.formAddItem.photo.push(photo)
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uplPhoto.push(e.target.result);
                    };
                    reader.readAsDataURL(photo);
                }       
            },
            deletePhoto(i){                
                this.uplPhoto.splice(i, 1);
                this.formAddItem.photo.splice(i, 1);
            },
            addItem(){
                this.validate();
                if(!this.$v.$error){
                    this.buttonLoading = true;
                    this.$store.dispatch('addItem', this.formAddItem)
                        .then((res)=> {
                            this.clearForm()
                            this.$v.$reset()
                        })
                        .finally(() => this.buttonLoading = false)
                }
            },
            clearForm(){
                let f = this.formAddItem;
                f.title = f.description = f.price = f.count = '';
                this.uplPhoto = f.photo = [];
                this.uplPhoto = JSON.parse(JSON.stringify(this.uplPhoto))
                this.$refs.itemImage.value = ''
            },
            validate(){
                this.$v.formAddItem.title.$touch()
                this.$v.formAddItem.description.$touch()
                this.$v.formAddItem.count.$touch()
                this.$v.formAddItem.price.$touch()
                this.$v.formAddItem.photo.$touch()
            }
        }
    }
</script>

<style scoped>

.profile-image-input {
    display: none;
}

.items_photo{
    margin: 10px;
    border: 3px solid grey;
    border-radius: 10%;
    transition: 1s;
    float: left;
}

.items_photo:first-child{
    border: 3px solid gold;
}

.items_photo:hover{
    transform: scale(1.7);
    z-index: 10;
}

.btn_photo{
    float: right;
}

.btn_photo:hover{
    transform: scale(1.2);
}

.submit_add-form{
    margin-top: 20px;
}

.btn_addPhoto{
    margin-top: 15px;
}

.block_items_photo{
    display: table;
}

button{
    outline: none;
}

</style>