<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import {onMounted, reactive, ref} from "vue";
import router from "../plugins/router.ts";
import {ElMessage} from "element-plus";
import * as userController from "../api/UserController.ts";
import {useUserStore} from "../stores/user.js";

const authPage = ref("login")
const userStore = useUserStore()
const form = reactive({
  username: "",
  password: "",
})

function authPageHandler(pathName){
  router.push({name: pathName})
}
function submit(){
  let flag = false
  if(form.username==""){
    ElMessage.error({message: "Userame must not be empty"})
    flag = true
  }
  if(form.password==""){
    ElMessage.error({message: "Password must not be empty"})
    flag = true
  }
  if(flag)return
  userController.signIn(form.username,form.password)
    .then(res => {
      console.log(res)
      userStore.$patch((state) => {
        state.username = form.username
        state.user_id = res.data.data.user_id
        state.atoken = res.data.data.access_token
        state.rtoken = res.data.data.refresh_token
      })
      userStore.set()
      router.push({name: "index"})
    })
    .catch(err => {
      console.log(err)
      ElMessage.error({
        message:"HTTP status: "+err.response.status
            +"\nAuthentification error\n"+
            err.response.data.description
      })
    })
}

onMounted(() => {
  userStore.get()
})
</script>

<template>
  <HeaderMenu></HeaderMenu>
  <div style="margin: 6vh"></div>
  <el-row justify="center">
    <el-col>
      <h2>Authorization form</h2>
    </el-col>
    <el-col>
      <div style="margin: 16px"></div>
    </el-col>
    <el-col :xs="20" :sm="16" :md="12" :lg="10" class="login-form">
      <el-form
          label-position="left"
          label-width="auto"
          :model="form"
          style="max-width: 600px"
      >
        <el-radio-group v-model="authPage" @change="authPageHandler">
          <el-radio-button value="login">Login</el-radio-button>
          <el-radio-button value="register">Register</el-radio-button>
        </el-radio-group>
        <div style="margin: 16px"></div>
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input show-password v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">
            Submit
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use '../styles/colors';
.login-form {
  padding: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
  background: var(--el-menu-bg-color);
}
.el-row h2{
  text-align: center;
  color: colors.$l-primary;
}
</style>