# pet-home

這項目是中南大學計算機學院軟件工程 18 級**軟件開發架構**寵物商店**前端**，前後端分離。

組員：

- 1804 黃柏曛 - 前端負責人
- 1805 吳建賢 - 後端負責人
- 1804 馮武 - 後端

指導老師：宋鐵

後端：[spring boot 後端](https://github.com/lumusen0305/springBoot-vue)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 組件與框架

我們使用以下包依賴：

 - **[Vue-cli](https://cli.vuejs.org/zh/guide/)**，一个基于 Vue.js 进行快速开发的完整系统。
 - **[Vue-Router](https://router.vuejs.org/zh/installation.html)**，是 Vue.js 官方的路由管理器。用於單頁面子組件。
 - **[Vuetify](https://vuetifyjs.com/zh-Hans/)**，是基于 Vue 編寫的 Material Design 框架。
 - **[Vuelidate](https://vuelidate.js.org/#getting-started)**，前端簡單的表單數據判斷，是簡單、輕量模型驗證。
 - **[vue-monoplasty-slide-verify](https://github.com/monoplasty/vue-monoplasty-slide-verify)**，第三方拼圖驗證碼服務組件。
 - **[Vuex](https://vuex.vuejs.org/zh/)**，作為 SPA 單頁面組件之間的傳值與各方法，共享數據。
 - **[Axios](https://www.npmjs.com/package/vue-axios)**，前端數據請求工具，具有 JQuery Ajax 效果。
 - **[第三方 Affix 組件](https://www.cnblogs.com/shenjp/p/10100837.html)**，由於 **Vuetify** 沒有 Affix 組件，加上我實際使用 **vue-affix** 感覺不是那麼實用，於是網上查到這個組件，感謝這位網友。組件有添加作者註解，以表示他人的智慧財產權。順便提醒使用這個組件的人，記得那個 Affix 的 CSS 是 `position: fixed`，在使用時，**Affix 外部要再包一個 DIV 並添加寬度以避免走版。**

## 頁面

> 註：因為目前頁面還在設計當中，不能 100% 確定頁面長怎樣，所以現階段不放頁面圖。

我們這個項目用了三個頁面應用：

- 介紹推廣頁面 - Introduce
- 登入註冊操作頁面 - Sign
- 主工作頁面 - Work

### Introduce

功能：作為所有網站的起始點，具有宣傳與廣告效果。雖然不是主要的頁面，但是依然很重要。

### Sign

功能：登入註冊使用者操作。

分別有 **Login** 和 **Register** 兩個子組件。

#### Login.vue

登入操作，使用拼圖驗證。

#### Register.vue

註冊操作，使用 E-mail 驗證。

### Work

這裡包含很多子組件。

#### Home

展示商品的頁面。

#### Cart

購物車。

#### Record

使用者購物紀錄。

#### User

使用者個人資料。

#### Setting

頁面設定。

#### About

開發團隊說明。

## License
[The MIT License](https://github.com/HuangNO1/PetHome_Front_Back/blob/master/LICENSE)
