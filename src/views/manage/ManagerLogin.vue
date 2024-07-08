<template>
    <div class="login-container" style="margin-top: 200px; margin-left: 600px">
        <div class="login-header">
            <div>Login</div>
        </div>
        <input type="text" class="login-input" placeholder="Username" id="username" v-model="username">
        <input type="password" class="login-input" placeholder="Password (Min-8, Max-15)" v-model="password"
            id="password" maxlength="15" minlength="8">
        <button class="login-button" id="login-button" @click="goTo('manage')">Login</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        goTo(name) {
            // 验证用户名和密码
            if (this.username === '' || this.password === '') {
                alert('请输入用户名和密码');
                return;
            }

            if (this.password.length < 8 || this.password.length > 15) {
                alert('密码长度必须在8到15之间');
                return;
            }
            if (this.username !== 'admin' || this.password !== 'admin123') {
                alert('用户名或密码错误');
                return
            }
            // 跳转到管理员页面

            this.$router.push({ name: name }).catch((err) => {
                err;
            });



        }
        // 跳转到商家页面
        // 执行路由跳转

    }
}


</script>
<style scoped>
.login-container {
    width: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1), 0px 0px 0px 3px #3498db, inset 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-header {
    font-size: x-large;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
}

.login-header h1 {
    color: #333;
    font-size: 24px;
}

.login-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    background: #f5f5f5;
    border-radius: 4px;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);
}

.login-button {
    width: 100%;
    padding: 10px;
    border: none;
    background: #3498db;
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 3px rgba(255, 255, 255, 0.5);
    transition: background 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
    background: #2980b9;
    transform: translateY(-2px);
}
</style>