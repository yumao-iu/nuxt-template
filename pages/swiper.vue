<template>
<p class="swiper_prev">上</p>
<p class="swiper_next">下</p>
<p class="swiper_pagination"></p>
<swiper
                :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
                :loop="true"
                :pagination="{
                  clickable: true,
                  el: '.swiper_pagination',
                }"
                :navigation="{
                  enable: true,
                  prevEl: '.swiper_prev',
                  nextEl: '.swiper_next',
                }"
                :autoplay="{
                  delay: 3000,
                }"
              >
              <!-- @slideChangeTransitionEnd="change_text" -->

                <SwiperSlide v-for="(v, i) in 10" :key="i">
                  <!-- <NuxtImg
                    format="webp"
                    :src="'/images/' + v.img"
                    quality="60"
                    loading="lazy"
                    :class="'img_' + v.id"
                  /> -->
                  <img src="/images/xiaohui.jpg" alt="">
                </SwiperSlide>
              </swiper>

</template>


<script setup></script>



<style lang="less">

</style>