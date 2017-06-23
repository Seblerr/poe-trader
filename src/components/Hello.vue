<template>
<div class="hello">
  <h1>{{ nextID }}</h1>

</div>
</template>

<script>
// import * as api from '../api'
import axios from 'axios'
const api = axios.create()

export default {
  async created () {
    this.init()
  },
  data () {
    return {
      nextID: ''
    }
  },
  methods: {
    async init () {
      var nextStash
      this.nextID = await this.getID()
      // console.log(nextID)
      nextStash = await this.getNextStash(this.nextID)
      console.log(nextStash)
      this.nextID = nextStash.next_change_id
      // console.log(nextId)
      while (true) {
        nextStash = await this.getNextStash(this.nextID)
        if (nextStash.error) {
          await this.sleep(5000)
        }
        this.nextID = nextStash.next_change_id
        console.log(nextStash)
        // console.log(nextId)
        await this.sleep(1000)
      }
    },
    async getNextStash (id) {
      const response = await api.post(`/api/fetchNextStash/${id}`)
      return response.data
    },
    async getID () {
      const response = await api.post(`/api/getNextID`)
      return response.data
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
