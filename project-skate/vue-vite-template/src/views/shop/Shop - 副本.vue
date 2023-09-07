<template>
	<h1>商店页面</h1>
	  <div class="grid-container">
	    <van-grid :border="0" :column-num="3">
	      <van-grid-item v-for="(image, index) in images" :key="index">
	        <img :src="image" alt="image" class="grid-image" @click="showImage(index)" />
	      </van-grid-item>
	    </van-grid>
	    <van-popup v-model="showPopup" position="center" :close-on-click-overlay="true">
	      <img :src="images[activeIndex]" alt="image" class="popup-image" />
	    </van-popup>
	  </div>
</template>

<script setup>
	import {onMounted, ref} from 'vue'
	//声明父组件支持的自定义事件
	const $emit = defineEmits(["change"])
	
	//触发父组件的自定义时间
	onMounted(()=>{
		 $emit("change", 4)
	})
	
	export default {
	  data() {
	    return {
	      images: [
	        'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
			'https://pic40.photophoto.cn/20160730/0010023489516486_b.jpg',
	      ],
	      showPopup: false,
	      activeIndex: 0,
	    };
	  },
	  methods: {
	    showImage(index) {
	      this.activeIndex = index;
	      this.showPopup = true;
	    },
	  },
	};
</script>

<style scoped>
	.grid-container {
	  padding: 20px;
	}
	
	.grid-image {
	  width: 100%;
	  height: 100%;
	  object-fit: cover;
	}
	
	.popup-image {
	  max-width: 90%;
	  max-height: 90%;
	}
</style>