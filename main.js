Vue.component('product',{
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

    <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText"/>
    </div>
    <div class="product-info">
        <!-- <h1>{{ brand }}{{ product }}</h1>  -->
        <!--used computed property below and their dependencies are brand and product-->
        <h1>{{ title }}</h1> 
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: inStock }">Out of Stock</p>
        <p>{{ sale }}</p>
        <p> Shipping:{{ shipping }}</p>

        <product-details :details="details"></product-details>

        <!--<a :href="link" target="_blank">
            More products like this!
        </a>

        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out</p>
        <p v-else> Out of Stock</p>
        <p v-show="onSale">On Sale</p> -->
        
        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">Add to Cart</button>

        <button @click="removeFromCart"
        :disable="!inStock"
        :class="{ disabledButton: !inStock }">Remove</button>

        <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
       </div>

        <product-review @review-submitted="addReview"></product-review>

    </div>    

</div>
    `,
    data(){
        return {
            brand:"Sample Brand",
            product: 'Socks',
            //image: './assets/vmSocks-green-onWhite.jpg',
            selectedVariant: 0,
            link: 'https://www.amazon.com/s?k=amazon+socks&adgrpid=85631776230&gclid=Cj0KCQjwl_SHBhCQARIsAFIFRVVJ5LtsuVJer9Hb2eI0LchRrHiKTOQId4eky36i_98FeWj0V-Yhk-gaAlUDEALw_wcB&hvadid=393538192266&hvdev=c&hvlocphy=1011072&hvnetw=g&hvqmt=e&hvrand=11144689940049171992&hvtargid=kwd-331763873234&hydadcr=22334_10729130&tag=hydglogoo-20&ref=pd_sl_3tp1kv9ew4_e',
            altText: 'A pair of socks',
            //inStock: false,
            //inventory:100,
            details: ["80% cotton","20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            reviews: [],
            onSale:true,
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            //console.log(index)(just for testing purposes)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            if(this.onSale, this.inStock){
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            //return this.brand + ' ' + this.product + ' are not on sale!'
        },
        shipping(){
            if(this.premium) {
                return"Free"
            } else {
                return 2.99
            }       
        }
        
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
    </ul>

    `
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
            
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
      </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >=0; i--) {
                if(this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})