<template>
  <div>
    <input type="file" multiple @change="change" accept="image/*" />
  </div>
</template>

<script setup>
import axios from "axios";

let content = ref("");

// URL.createObjectURL(files) //会返回临时的文件地址

let append_file = async () => {
  let formData = new FormData();
//   for
  formData.append("files", files[i]);
//   await api_index.set_swiper(formData);
};

let change = (e) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (e) => {
    content.value = e.target.result.split(",")[1];
    upload();
  };
};

let upload = async () => {
  try {
    let response = await axios({
      method: "put",
      url: "https://api.github.com/repos/yumao-iu/bs/contents/image.png", // 替换成文件的实际路径
      headers: {
        Authorization: `token 密钥`,
        "Content-Type": "application/json",
      },
      data: {
        message: "信息",
        content: content.value,
        branch: "master",
      },
       onUploadProgress: (progressEvent) => {
      
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`: ${uploadProgress.value}%`);
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(
      "上传失败：",
      error.response ? error.response.data : error.message
    );
  }
};
</script>
