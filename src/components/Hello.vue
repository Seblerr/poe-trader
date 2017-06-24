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
      this.nextID = await this.getID()
      while (true) {
        var nextStash = await this.getNextStash(this.nextID)
        if (nextStash.error) {
          console.log(nextStash.error)
          await this.sleep(5000)
        }
        var stashes = nextStash.stashes
        var items = await this.getItems(stashes)
        console.log(stashes)

        console.log(items)
        this.nextID = nextStash.next_change_id
        await this.sleep(2000)

      // console.log(nextStash)
        // console.log(nextId)
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

    async getItems (stashes) {
      var items = []
      stashes.forEach(function (stash) {
        items.concat.apply(stash.items)
        // console.log(stash)
        // stash.items.forEach(function (item) {
          // items.push(item)
          // console.log(item)
      })

      return items
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
