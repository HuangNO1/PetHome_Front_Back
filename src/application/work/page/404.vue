<template>
  <div>
  <!--
    <div class="pageNotFound">
      404
    </div>
    <div class="PNFdescript">
      You have to go back to the Home page.
    </div>-->
    <kinesis-container style="text-align: center; margin-top: 10%;">
      <kinesis-element style="font-size: 10rem; color: #3f51b5;" :strength="30">
        404
      </kinesis-element>
      <kinesis-element class="mb-4" style="font-size: 2rem" :strength="30">
       You have to go back to the Home page.
      </kinesis-element>
      <kinesis-element :strength="30">
        <v-btn large color="primary" to="Home">Home</v-btn>
      </kinesis-element>
    </kinesis-container>
  </div>
</template>
<script>
import { KinesisContainer, KinesisElement} from 'vue-kinesis'

export default {
  components: {
    KinesisContainer, KinesisElement
  },
}
</script>
<style>
.pageNotFound {
  font-size: 10rem;
  text-align: center;
  color: #3f51b5;
  margin-top: 10%;
}
.PNFdescript {
  font-size: 2rem;
  text-align: center;
}
</style>
