<template>
  <div class="container">
      <div class="row">
          <div class="card col s6 offset-s3">
              <form class="card-content" @submit.prevent="geocode">
                  <h5 class="center">經緯度資訊</h5>
                  <div class="row">
                      <div class="input-field col s12">
                          <label for="name">地點名稱</label>
                          <input type="text" id="name" v-model="place.name" />
                      </div>
                      <div class="input-field col s12">
                          <label for="name">地址</label>
                          <input type="text" id="address" v-model="place.address" />
                      </div>
                      <!--顯示錯誤資訊-->
                      <p v-if="errormsg" class="center">{{ errormsg }}</p>
                      <div class="input-field col s12 center">
                          <button type="submit" class="btn waves-light waves-effect">submit</button>
                      </div>
                  </div>
              </form>
          </div>
          <!--當成功獲得經緯度時，顯示餐廳資訊及經緯度資訊-->
          <div class="card col s6 offset-s3" v-if="hasGeo">
              <div class="card-content">
                  <h5 class="center">確認資訊</h5>
              </div>
              <div class="card-action">
                  <GMap
                    :center="{ lat: place.lat, lng: place.lng }"
                    :places="[place]"
                    :streetViewControl="false"
                    :mapTypeControl="false"
                    :fullscreenControl="true"
                    :zoomControl="true"
                  ></GMap>
              </div>
              <div class="card-action">
                  <p class="grey-text">地點名稱：{{ place.name }}</p>
                  <p class="grey-text">地點緯度：{{ place.lat }}</p>
                  <p class="grey-text">地點經度：{{ place.lng }}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import GMap from '../components/GMap.vue'
export default {
    components: {
        GMap
    },
    data() {
        return{
            place: {
                address: '',
                name: '',
                lat: '25.0325917',
                lng: '121.562499'
            },
            errormsg: null,
            // 存放 geocoder 物件實例
            geocoder: null,
            // 存放目前是否已獲得座標的狀態
            hasGeo: false
        }
    },
    mounted() {
        this.initGeocoder()
    },
    methods: {
        // 透過 google.maps.Geocoder() 物件建構子建立一個 geocoder 物件實例
        initGeocoder() {
            const google = window.google
            this.geocoder = new google.maps.Geocoder()
        },
        geocode() {
            // 取得餐廳地址
            const address = this.place.address
            this.geocoder.geocode(
                // GeocoderRequest 物件: 帶入要轉換的地址與相關設定
                {
                    // 地址
                    address: address,
                    // 限制轉換的結果必須是在台灣的範圍
                    componentRestrictions: {
                        country: 'TW'
                    }
                },
                // 轉換完成後呼叫的 callback 函式
                (results, status) => {
                    if (status === 'OK') {
                        // 當轉換成功時，將第一筆結果的經緯度存取起來
                        this.place.lat = results[0].geometry.location.lat()
                        this.place.lng = results[0].geometry.location.lng()
                        // 更新狀態為已經獲得經緯度
                        this.hasGeo = true
                    } else {
                        // 更新狀態為未經獲得經緯度
                        this.hasGeo = false
                        // 當轉換失敗時，顯示錯誤原因
                        this.errormsg = status
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 300px;
}
</style>