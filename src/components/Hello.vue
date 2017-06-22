<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <h1>{{ nextId }}</h1>
  <h2>Essential Links</h2>
  <ul>
    <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
    <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
    <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
    <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    <br />
    <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
  </ul>
  <h2>Ecosystem</h2>
  <ul>
    <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
    <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
    <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
    <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
  </ul>
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
      msg: 'Hej wanka',
      nextId: ''
    }
  },
  methods: {
    async init () {
      var nextId
      var nextStash
      const response = await api.post('/api/fetchStash/')
      if (response.data.error) {
        console.log(response.data.error.message)
      } else {
        nextId = response.data.next_change_id
        // console.log(nextId)
        nextStash = await this.getNextStash(nextId)
        console.log(nextStash)
        nextId = nextStash.next_change_id
        console.log(nextId)
        while (nextStash.stashes.length !== 0) {
          nextStash = await this.getNextStash(nextId)
          nextId = nextStash.next_change_id
          console.log(nextStash)
          console.log(nextId)
          await this.sleep(5000)
        }

        // var stashArray = response.data.stashes
        // console.log(stashArray)
      }
    },
    async getNextStash (id) {
      // setInterval(async function () {
      const response = await api.post(`/api/fetchNextStash/${id}`)
      return response.data
      // }, 5000)
    },
    getId (stash) {
      return stash.next_change_id
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
