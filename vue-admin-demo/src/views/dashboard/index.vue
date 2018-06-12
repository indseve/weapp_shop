<template>
  <div class="dashboard-container">
    <div class="dashboard-text"><h1>微信商城小程序管理后台</h1></div>
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
