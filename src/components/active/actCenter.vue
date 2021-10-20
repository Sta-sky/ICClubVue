.<template>

    <div>
        <h1>我是活动中心</h1>
    </div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
        <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
        </bm-marker>
    </baidu-map>
</template>

<script>
    import { toRefs, reactive } from 'vue'
    export default {
        name:'actCenter',
        setup(){
            const state = reactive({
                timeVale: '',
                isMap: false,
                center: {lng: 0, lat: 0},
                zoom: 0
            })

            function handler(params) {
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            }

            return {...toRefs(state), handler}
        },

    }

</script>

<style >
.Bmap{
    width: 100%;
    height: 400px;
}

</style>