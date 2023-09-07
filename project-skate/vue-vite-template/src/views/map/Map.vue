<template>
	
</template>

<script setup>
import { onMounted, ref } from 'vue';

const content = ref('');
const image = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  // 这里可以将照片上传至服务器并获取到图片的 URL
  // 在这个例子里，我们只是将图片对象存储在本地
  image.value = file;
};

const publish = () => {
  if (content.value.trim() !== '') {
    // 将文本信息和图片 URL 发送给后端进行保存
    const data = {
      username: "用户名称",  // 用户名
      content: content.value,  // 文本内容
      imageUrl: image.value ? URL.createObjectURL(image.value) : null  // 图片的 URL
    };

    // 发送数据给后端接口进行处理，比如保存到数据库
    savePost(data)
      .then(() => {
        window.alert('发布成功！');
        // 清空输入框和图片
        content.value = '';
        image.value = null;
      })
      .catch((error) => {
        window.alert('发布失败！');
        console.error(error);
      });
  } else {
    window.alert('请输入朋友圈内容！');
  }
};

const savePost = (data) => {
  // 这里使用 fetch 或者 axios 等工具发送请求至后端接口
  // 以下示例使用 fetch 发送 POST 请求到指定的后端接口
  return fetch('后端接口地址', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
}

.van-field {
  margin-bottom: 20px;
}

.van-button {
  margin-top: 20px;
}
</style>
