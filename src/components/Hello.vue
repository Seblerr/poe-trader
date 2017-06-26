<template>
<div class="hello">
  <h1>{{ nextID }}</h1>

</div>
</template>

<script>
import axios from 'axios'
const api = axios.create()

export default {
  async created () {
    this.init()
  },
  data () {
    return {
      nextID: '',
      allItems: ''
    }
  },
  methods: {
    async init () {
      var allItems = []

      this.nextID = await this.getID()
      while (true) {
        await this.getStashes(this.nextID).then(async (response) => {
          var stashes = response.stashes
          var items = await this.getItems(stashes)
          allItems = allItems.concat(items)
          // console.log(allItems)
          this.nextID = response.next_change_id
          // this.allItems = allItems
          await this.sleep(1000)
        })
      }
    },

    async getStashes (id) {
      const response = await api.post(`/api/getStashes/${id}`)
      return response.data
    },

    async getID () {
      const response = await api.post(`/api/getNextID`)
      return response.data
    },

    async getItems (stashes) {
      var items = []
      stashes.forEach(function (stash) {
        // console.log(stash)
        // stash.items.forEach(function (item) {
        items.push({lastCharacterName: stash.lastCharacterName,
          items: stash.items})
        // })
      })
      this.searchItems("Kaom's Heart", items)
      // console.log(items)
      return items
    },

    searchItems (keyword, items) {
      // console.log(items)
      items.forEach(function (item) {
        item.items.forEach(function (itemz) {
          if (keyword === itemz.name.substring(28)) {
            console.log('found item')
            return item.lastCharacterName
          }
        })
        // console.log(item)
      })
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
