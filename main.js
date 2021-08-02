var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        link: 'https://www.amazon.com/s?k=amazon+socks&adgrpid=85631776230&gclid=Cj0KCQjwl_SHBhCQARIsAFIFRVVJ5LtsuVJer9Hb2eI0LchRrHiKTOQId4eky36i_98FeWj0V-Yhk-gaAlUDEALw_wcB&hvadid=393538192266&hvdev=c&hvlocphy=1011072&hvnetw=g&hvqmt=e&hvrand=11144689940049171992&hvtargid=kwd-331763873234&hydadcr=22334_10729130&tag=hydglogoo-20&ref=pd_sl_3tp1kv9ew4_e',
        altText: 'A pair of socks',
        inventory:100,
        onSale:true,
        details: ["80% cotton","20% polyester", "Gender-neutral"]
    }
})